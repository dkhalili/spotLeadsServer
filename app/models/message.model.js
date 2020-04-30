const Conversation = require('./conversation.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
    message: String,
    sender: { type: Schema.Types.ObjectId },
   	receiver: { type: Schema.Types.ObjectId },
   	conversationId:  { type: Schema.Types.ObjectId, ref: 'Conversation' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
