const User = require('../models/user');
const Resource = require('../models/resources')
const ObjectId = require('mongodb').ObjectID;

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
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.getDetails = (req, res, next) => {
    return Resource
        .findOne({
            _id: ObjectId(req.query.id)
        })
        .then(resource => {
            res.json({
                data: resource.title
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getReviews = (req, res, next) => {
    Resource
        .find({
            _id: req.query.resId
        })
        .deepPopulate('reviews.userId')
        .then(rev => {
            let data = rev[0]['reviews'].map(a => [a.userId.username, a.review])
            res.json({
                success: true,
                data: data
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

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
            if (!resId) {
                const error = new Error('no affiliation');
                error.statusCode = 401;
                throw error
            }
            if (resId.toString() === resourceId.toString()) {
                const error = new Error("Can't review your own resource!");
                error.statusCode = 401;
                throw error
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
                        const error = new Error("Resource already reviewed!");
                        error.statusCode = 401;
                        throw error
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
                                    success: true
                                })
                            })
                            .catch(err => next(err))
                })
                .catch(err => {
                    next(err)
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
    })
}

exports.postUserResource = (req, res, next) => {
    const affiliation = ObjectId(req.body.affiliation);
    User
        .findOneAndUpdate(
            {_id: req.userId}, 
            {affiliation: affiliation},
            {new: true}
        )
        .then(() => {
            res.json({
                success: true
                })
            })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}