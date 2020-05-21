const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.secret)
    } catch (err){
        console.log(err)
    }
    if (!decodedToken) {
        const error = new Error('not authenticated');
        error.statusCode = 401;
        throw error
    }
    req.userId = decodedToken.userId;
    next()
}