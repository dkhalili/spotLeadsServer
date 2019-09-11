module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/api/users', users.create);

    // Retrieve all Users
    app.get('/api/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/api/user/:userId', users.findOne);

    // Update a User with userId
    app.put('/api/user/:userId', users.update);


    // Retrieve all Clients
    app.get('/api/users/clients', users.findAllClients);

    // Retrieve all Brokers
    app.get('/api/users/brokers', users.findAllBrokers);

    // Login with PhoneNumber
    app.get('/api/user/login/:phoneNumber', users.login)

    // Add favorites
    app.put('/api/user/favorites/:userId', users.addFavorites)

    // Delete a User with userId
    app.delete('/api/user/:userId', users.delete);
}