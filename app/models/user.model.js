const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    phoneNumber: String,
    userType: String,
    UserAccount: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);