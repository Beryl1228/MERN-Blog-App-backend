const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(403).json({ msg: "Not authorized. No token" });

    if (authToken && authToken.startsWith("Bearer")) {
        const token = authToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    return res.status(401).json({ msg: 'Token expired' });
                } else {
                    return res.status(403).json({ msg: 'Wrong token' });
                }
            } else {
                req.user = data; // an object with the user id as its only property
                next();
            }
        });
    }
}

module.exports = verifyToken;
