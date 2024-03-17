const jwt = require('jsonwebtoken');

function authorize(req, res, next) {

    const { token } = req.body;
    
    jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
        if (err) return res.status(403).json({ Error: 'Invalid Token' });
        req.email = decoded.email;
        req.name = decoded.name;
        req.admin = decoded.admin;
        req.coach = decoded.coach;
        next();
    })   
    
}

module.exports = authorize;