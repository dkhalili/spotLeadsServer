const Listing = require('./listing.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const BrokerSchema = mongoose.Schema({
    fullName: String,
    brokerage: String,
    about: String,
    reviews: [String],
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Broker', BrokerSchema);
