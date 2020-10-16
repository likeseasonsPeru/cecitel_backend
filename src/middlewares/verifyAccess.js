const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

module.exports = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({status: false, msg: 'No token provided'})
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) res.status(403).json({status: false, msg: 'Unauthorized'});
        req.userData = user;
        next();
    })
}