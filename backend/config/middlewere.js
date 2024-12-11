const jwt = require('jsonwebtoken');
const UserModel = require('../models/usermodel')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;