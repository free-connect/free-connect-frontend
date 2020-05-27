const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {
        type:  String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    affiliation: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    likes: {
        type: [],
        required: true
    },
    admin: {
        type: Boolean,
        required: false
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)