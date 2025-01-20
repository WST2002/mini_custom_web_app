const db = require('../databaseConnection/dbConnect');
const sharp = require('sharp');
const checkPlanValidity = require('../functions/checkPlanValidity');

exports.createMiniWebsite = async (req, res) => {
    try {
        const {
            userId,
            businessName,
            about,
            phoneNumber,
            whatsapp,
            products,
            params,
            contactNumber,
            whatsappNumber,
            aboutUs,
            gallery,
            paymentLink,
            socialLinks,
            customLinks,
            template
        } = req.body;

        // Extract and compress the logo
        let logo = req.files['logo']?.[0]?.buffer || null;
        if (logo) {
            logo = await sharp(logo).resize(500).toBuffer();
        }

        const photoGallery = req.files['photoGallery']?.map(file => file.buffer) || [];
        const productData = products
            ? JSON.parse(products).map(product => ({
                title: product.title,
                desc: product.desc,
                image: req.files['products']?.find(file => file.originalname === product.image)?.buffer || null,
                paymentLink: product.paymentLink,
                price: product.price
            }))
            : [];

        const status = 'live';
        const createdAt = new Date();

        db.execute(
            'CALL CreateMiniWebsite(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                userId,
                businessName,
                logo,
                about,
                phoneNumber,
                whatsapp,
                JSON.stringify(photoGallery),
                JSON.stringify(productData),
                params,
                status,
                createdAt,
                template,
                contactNumber,
                whatsappNumber,
                aboutUs,
                JSON.stringify(gallery),
                paymentLink,
                JSON.stringify(socialLinks),
                JSON.stringify(customLinks)
            ],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Internal server error.' });
                }
                res.status(201).json({ message: 'Mini website created successfully!' });
            }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.editMiniWebsite = async (req, res) => {
    try {
        const {
            params,
            businessName,
            phoneNumber,
            whatsappNumber,
            products,
            paymentLink,
            photoGallery
        } = req.body;

        db.execute(
            'CALL EditMiniWebsite(?, ?, ?, ?, ?, ?, ?)',
            [
                params || null,
                businessName || null,
                phoneNumber || null,
                whatsappNumber || null,
                JSON.stringify(photoGallery),
                JSON.stringify(products),
                paymentLink || null,
            ],
            err => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Mini website updated successfully!' });
            }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.getMiniWebsites = (req, res) => {
    db.execute('CALL GetAllMiniWebsites()', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
}

exports.getMiniWebsiteByParams = async (req, res) => {
    const { params } = req.params;

    db.execute('CALL GetMiniWebsiteByParams(?)', [params], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const website = results[0][0];
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }

        try {
            const plan = await checkPlanValidity(website.userId);

            if (plan === 'no') {
                return res.status(403).json({ error: 'No active plan' });
            }

            res.json(website);
        } catch (planCheckError) {
            console.error('Error checking plan validity:', planCheckError);
            res.status(500).json({ error: 'Error checking plan validity' });
        }
    });
}

exports.deleteMiniWebsite = (req, res) => {
    const { params } = req.params;

    db.execute('CALL DeleteMiniWebsite(?)', [params], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mini website deleted successfully!' });
    });
}

exports.increaseViews = (req, res) => {
    const { params } = req.params;

    db.execute('CALL IncrementWebsiteViews(?)', [params], (err, results) => {
        if (err) {
            console.error('Database error:', err);

            if (err.sqlMessage === 'Website not found') {
                return res.status(404).json({ error: 'Website not found' });
            }

            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json({ message: 'Views incremented successfully!' });
    });
}

exports.editWebsiteLinks = async (req, res) => {
    try {
        const { params } = req.params;
        const { socialLinks, customLinks } = req.body;

        if (!params) {
            return res.status(400).json({ error: 'Params identifier is required.' });
        }

        db.execute(
            'CALL EditMiniWebsiteLinks(?, ?, ?)',
            [
                params,
                JSON.stringify(socialLinks),
                JSON.stringify(customLinks)
            ],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: err.message });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Mini-website not found.' });
                }

                res.json({ message: 'Website links updated successfully!' });
            }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};