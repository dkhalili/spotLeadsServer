const Listing = require('./listing.model.js');

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    identifier: String,
    isClient: Boolean,
    fullName: String,
    commercial: Boolean,
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    renter: Boolean,
    startingDate: String,
    price: Number,
    zones: [String],
    size: Number,
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    brokerage: String,
    about: String,
    reviews: [String],
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);