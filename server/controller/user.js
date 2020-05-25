const User = require('../models/user');
const Resource = require('../models/resources')
const ObjectId = require('mongodb').ObjectID

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

exports.postReview = (req, res, next) => {
    const { resourceId, review } = req.body;
    const user = req.userId
    Resource
        .findOne({
            _id: resourceId
        })
        .then(resource => {
            resource.reviews.push({
                userId: user,
                review: review
            })
            return resource
                    .save()
                    .then(() => {
                        console.log('hello')
                        res.json({
                            msg: 'success'
                        })
                    })
                    .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

exports.postUserResource = (req, res, next) => {
    const affiliation = ObjectId(req.body.affiliation)
    User
        .findOneAndUpdate(
            {_id: req.userId}, 
            {affiliation: affiliation},
            {new: true}
        )
        .then(() => {
            res.json({
                msg: 'success'
                })
            })
        .catch(err => console.log(err))
}