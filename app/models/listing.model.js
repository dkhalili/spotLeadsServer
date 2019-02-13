const Broker = require('./broker.model.js');
const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ListingSchema = mongoose.Schema({
    address: String,
    images: [String],
    commercial: Boolean,
    renter: Boolean,
    broker: { type: Schema.Types.ObjectId, ref: 'Broker' },
   	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    price: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Listing', ListingSchema);
