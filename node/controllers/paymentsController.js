const db = require('../databaseConnection/dbConnect');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPayment = async (req, res) => {
    try {
        const { userId, plan, price } = req.body;

        if (!userId || !plan || !price) {
            return res.status(400).json({ error: 'userId, plan, and price are required.' });
        }

        const options = {
            amount: price * 100,
            currency: 'INR',
            receipt: `receipt_${userId}_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            message: 'Payment initiated successfully!',
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { userId, plan, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        if (!userId || !plan || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const calculatedSignature = hmac.digest('hex');

        if (calculatedSignature !== razorpaySignature) {
            return res.status(400).json({ error: 'Payment verification failed.' });
        }

        db.execute(
            'CALL ChangeUserPlan(?, ?)',
            [userId, plan],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Error updating user plan.' });
                }

                res.json({
                    message: 'Payment verified and plan updated successfully!',
                    plan,
                });
            }
        );
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}