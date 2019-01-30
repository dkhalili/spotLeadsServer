module.exports = (app) => {
    const brokers = require('../controllers/broker.controller.js');

    // Create a new Broker
    app.post('/api/brokers', brokers.create);

    // Retrieve all Brokers
    app.get('/api/brokers', brokers.findAll);

    // Retrieve a single Broker with brokerId
    app.get('/api/brokers/:brokerId', brokers.findOne);

    // Update a Broker with brokerId
    app.put('/api/broker/:brokerId', brokers.update);

    // Delete a Broker with brokerId
    app.delete('/api/brokers/:brokerId', brokers.delete);
}