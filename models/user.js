const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    fristname: String,
    lastname: String,
    username: String,
    email: String,
    password: Number,
}),
User = mongoose.model('user', userSchema);

module.exports = User;
