const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    name: String,
    password:String,
    user_type_id:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
