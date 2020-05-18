const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.postRegister = (req, res, next) => {
    const {username, password, affiliation, name, email} = req.body;
    User
        .findOne({
            email: email
        })
        .then(userCheck => {
            if (userCheck) {
                return res.json({
                    msg: false
                })
            } else {
                return bcrypt
                    .hash(password, 12)
                    .then(hashedPw => {
                        const user = new User({
                            username: username,
                            password: hashedPw,
                            affiliation: affiliation,
                            name: name,
                            email: email,
                            likes: [],
                            reviews: []
                        })
                        user
                            .save()
                            .then(() => {
                                res.json({
                                    msg: true
                                })
                            })
                            .catch(err => console.log(err))
                    })
            }
        })
        .catch(err => console.log(err))
};

exports.postLogin = (req, res, next) => {
    const { password, username } = req.body;
    let AuthedUser;
    User
        .findOne({
            username: username
        })
        .then(user => {
            if (!user) {
                return res.json({
                    msg: 'no user'
                })
            }
            AuthedUser = user;
            return bcrypt
                .compare(password, user.password)
                .then(match => {
                    if (!match) {
                        res.json({
                            msg: 'no match'
                        })
                        return;
                    };
                    const token = jwt.sign({
                        email: AuthedUser.email,
                        userId: AuthedUser._id.toString()
                    }, 
                    'ThisStringisObnoxiouslylongforSAFETYBROSEPh!!!!!',
                    {
                        expiresIn: '1hr'
                    }
                    );
                    res.json({
                                token: token,
                                userId: AuthedUser._id,
                                msg: 'success'
                            })
                })
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    // console.log(req.session.user)
    // req.session
    // .destroy(err => {
    //     console.log(err)
    //     res.json({
    //         msg: true
    //     })
    // })
}