const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:  String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    affiliation: {
        type: Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    name: {
        type:  String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    //same as checked in resource model
    likes: {
        type: [],
        required: true
    },
    reviews: {
        type: [],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema)