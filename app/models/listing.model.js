const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ListingSchema = mongoose.Schema({
    address: String,
    zones: [String],
    images: [String],
    commercial: Boolean,
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    size: Number,
    renter: Boolean,
    broker: { type: Schema.Types.ObjectId, ref: 'User' },
   	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    price: Number,
    about: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Listing', ListingSchema);
