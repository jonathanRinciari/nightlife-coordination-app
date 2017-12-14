const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    githubId: String,
    lastSearch: {type: String, default: null}
});

const User = mongoose.model('user', userSchema);

module.exports = User;