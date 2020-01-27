module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');

    // Create a new Message
    app.post('/api/messages', messages.create);

    // Retrieve all Messages
    app.get('/api/messages', messages.findAll);

    // Retrieve a single Message with userId
    app.get('/api/message/:userId', messages.findOne);

    // Retrieve all Messages by BrokerId and UserId
    app.get('/api/messages/user/:userId/broker/:brokerId', messages.findByIds);


}