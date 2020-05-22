const User = require('../models/user')

exports.getMyResource = (req, res, next) => {
    User
        .findOne({
            _id: req.userId
        })
        .populate('affiliation')
        .then(user => {
            const myResource = user.affiliation;
            res.json(myResource)
        })
        .catch(err => console.log(err))
};