const db = require("../databaseConnection/dbConnect");
const createToken = require("../middleware/createToken");
const createAdminToken = require("../middleware/createAdminToken");
require('dotenv').config();

exports.adminAuth = (req, res) => {
    const adminId = process.env.ADMIN_ID
    const adminPassword = process.env.ADMIN_PASSWORD
    const { id, password } = req.body
    if (adminId == id && adminPassword == password) {
        const token = createAdminToken(req.id);
        res.json({ login: true, adminToken: token });
    } else {
        res.status(401).json({ login: true })
    }
}

exports.getRazorPayKey = (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID })
}

exports.updatePlan = (req, res) => {
    const { planId } = req.params;
    const { name, features, price, recommended } = req.body;

    if (!planId || (!name && !features && !price && recommended === undefined)) {
        return res.status(400).json({ error: 'Invalid input: Plan ID and at least one field to update are required' });
    }

    db.execute(
        'CALL UpdatePlan(?, ?, ?, ?, ?)',
        [
            planId,
            name || null,
            features ? JSON.stringify(features) : null,
            price || null,
            recommended !== undefined ? (recommended ? 1 : 0) : 0,
        ],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: 'Plan updated successfully!' });
        }
    );
}

exports.updateUserDetails = async (req, res) => {
    const { userId } = req.params;
    const { name, number, password, plan } = req.body;

    try {
        if (!userId || (!name && !number && !password && !plan)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        await db.execute('CALL UpdateUserDetails(?, ?, ?, ?, ?)', [
            userId,
            name || null,
            number || null,
            password || null,
            plan || null,
        ]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

exports.getAllPlans = (req, res) => {
    db.query("select * from plans", (err, result, field) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    db.execute('DELETE FROM users WHERE userId = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully!' });
    });
}

exports.getUsers = (req, res) => {
    db.query("select * from users", (err, result, field) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
};