const Broker = require('./broker.model.js');
const User = require('./user.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
    message: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
   	broker: { type: Schema.Types.ObjectId, ref: 'Broker' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
