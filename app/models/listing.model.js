const Broker = require('./broker.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ListingSchema = mongoose.Schema({
    address: String,
    images: [String],
    commercial: Boolean,
    renter: Boolean,
    broker: { type: Schema.Types.ObjectId, ref: 'Broker' },
    price: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Listing', ListingSchema);
