module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');

    // Create a new Listings
    app.post('/api/messages', messages.create);

    // Retrieve all Listings
    app.get('/api/messages', messages.findAll);

    // Retrieve all Listings by BrokerId
    app.get('/api/messages/user/:userId/broker/:brokerId', messages.findByIds);

    // // Retrieve all Listings by UserId
    // app.get('/api/listings/user/:userId', listings.findByUser);

    // // Retrieve a single Listing with listingId
    // app.get('/api/listings/:listingId', listings.findOne);

    // // Update a Listing with listingId
    // app.put('/api/listing/:listingId', listings.update);

    // // Delete a Listing with listingId
    // app.delete('/api/messages/:listingId', listings.delete);
}