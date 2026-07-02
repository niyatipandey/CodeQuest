const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    const tokenExist = req.headers.authorization;
    if (!tokenExist) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = tokenExist.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = checkAuth;