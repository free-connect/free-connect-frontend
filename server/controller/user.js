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
    const user = req.userId;
    let resId='';
    User
        .findOne({
            _id: user
        })
        .then(user => {
            resId = user.affiliation;
            if (resId.toString() === resourceId.toString()) {
                res.json({
                    msg: 'your resource'
                })
                throw Error('cannot review own resource')
            }
        })
        .then(() => {
            Resource
                .findOne({
                    _id: resourceId
                })
                .then(checkResource => {
                    let test = checkResource.reviews.find(a=> a.userId.toString() === user.toString());
                    if (test) {
                        res.json({
                            msg: 'already reviewed'
                        })
                        throw Error('already reviewed')
                    } else {
                        return checkResource
                    }
                })
                .then(resource => {
                    resource.reviews.push({
                        userId: user,
                        review: review
                    })
                    return resource
                            .save()
                            .then(() => {
                                res.json({
                                    msg: 'success'
                                })
                            })
                            .catch(err => console.log(err))
                })
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