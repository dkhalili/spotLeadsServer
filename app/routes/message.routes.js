module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');

    // Create a new Message
    app.post('/api/messages', messages.create);

    // Create a new Message
    app.post('/api/messages/QR', messages.createQR);

    // Retrieve all Messages
    app.get('/api/messages', messages.findAll);

    // Retrieve a single Message with messageId
    app.get('/api/message/:messageId', messages.findOne);

    // Retrieve all Messages by BrokerId and UserId
    app.get('/api/messages/user/:userId/broker/:brokerId', messages.findByIds);


}