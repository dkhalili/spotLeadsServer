module.exports = (app) => {
    const conversations = require('../controllers/conversation.controller.js');

    // Create a new Conversation
    app.post('/api/conversations', conversations.create);

    // Retrieve all Conversations
    app.get('/api/conversations', conversations.findAll);

    // Retrieve a single Message with conversationId
    app.get('/api/conversation/:conversationId', conversations.findOne);

    // Update a conversation with conversationId
    app.put('/api/conversation/:conversationId', conversations.update);

    // Retrieve all Conversations by clientId
    app.get('/api/conversations/client/:clientId', conversations.findByClient);

    // Retrieve all Conversations by brokerId
    app.get('/api/conversations/broker/:brokerId', conversations.findByBroker);

    // // Retrieve all Messages by BrokerId and UserId
    // app.get('/api/messages/user/:userId/broker/:brokerId', messages.findByIds);


}