const Listing = require('./listing.model.js');
const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ClientSchema = mongoose.Schema({
	userAccount: { type: Schema.Types.ObjectId, ref: 'User' },
    fullName: String,
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

module.exports = mongoose.model('Client', ClientSchema);