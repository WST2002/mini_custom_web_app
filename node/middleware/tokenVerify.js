const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearer = req.headers["access-key"];
    
    if (!bearer) {
        return res.status(400).json({message: "Unauthorised Access!"});
    }
    
    if (bearer) {
        const token = bearer.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, data) => {
            if (error) {
                console.error(error);
                return res.status(401).json({message: "Invalid Token"});
            } else {
                req.userData = data;
                next();
            }
        }); 
    }
};

module.exports = verifyToken;