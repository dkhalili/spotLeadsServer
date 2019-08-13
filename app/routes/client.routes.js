module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');

    // // Create a new Client
    // app.post('/api/clients', clients.create);

    // Retrieve all Clients
    app.get('/api/clients', clients.findAll);

    // Retrieve a single Client with clientId
    app.get('/api/clients/:clientId', clients.findOne);

    // Update a Client with clientId
    app.put('/api/client/:clientId', clients.update);

    // Delete a Client with clientId
    app.delete('/api/clients/:clientId', clients.delete);
}