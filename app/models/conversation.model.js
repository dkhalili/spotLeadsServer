const User = require('./user.model.js');
const Listing = require('./listing.model.js');
const Message = require('./message.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ConversationSchema = mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User' },
   	broker: { type: Schema.Types.ObjectId, ref: 'User' },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing' },
    accepted: Boolean,
    messages: [{ type: Schema.Types.Mixed, ref: 'Message' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', ConversationSchema);
