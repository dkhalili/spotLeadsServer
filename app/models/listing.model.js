const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ListingSchema = mongoose.Schema({
    address: String,
    zone: String,
    images: [String],
    commercial: Boolean,
    renter: Boolean,
    broker: { type: Schema.Types.ObjectId, ref: 'User' },
   	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    price: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Listing', ListingSchema);
