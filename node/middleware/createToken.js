const jwt = require('jsonwebtoken');

const createToken = (userId) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = { id: userId };
    const options = { expiresIn: '24h' };

    return jwt.sign(payload, secretKey, options);
};

module.exports = createToken;
