const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
