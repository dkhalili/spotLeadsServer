const Listing = require('./listing.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    commercial: Boolean,
    renter: Boolean,
    startingDate: String,
    price: String,
    zipCode: String,
    sizeResident: Number,
    sizeCommercial: Number,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);