module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/api/users', users.create);

    // Retrieve all Users
    app.get('/api/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/api/users/:userId', users.findOne);

    // Update a User with userId
    app.put('/api/user/:userId', users.update);

    // Delete a User with userId
    app.delete('/api/users/:userId', users.delete);
}