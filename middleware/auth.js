// Middleware to extract user ( or user.id) by sending token to the header when accessing a protected route

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token)
        return res.status(401).json({ msg: 'No token, Authorization Denied' });

    // Verify the token
    try {
        // Once token is verified, payload is put into the variable 'decoded'
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Extract user from the payload inside variable 'decoded' & assign it to request object 'req'
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}