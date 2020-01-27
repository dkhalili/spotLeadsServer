const Broker = require('./broker.model.js');
const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
    message: String,
    sender: { type: Schema.Types.ObjectId },
   	receiver: { type: Schema.Types.ObjectId },
   	listing: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
