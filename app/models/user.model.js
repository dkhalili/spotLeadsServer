const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    commercial: Boolean,
    renter: Boolean,
    startingDate: String,
    price: String,
    zipCode: String,
    sizeResident: Number,
    sizeCommercial: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);