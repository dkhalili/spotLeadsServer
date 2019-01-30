module.exports = (app) => {
    const listings = require('../controllers/listing.controller.js');

    // Create a new Listings
    app.post('/api/listings', listings.create);

    // Retrieve all Listings
    app.get('/api/listings', listings.findAll);

    // Retrieve a single Listing with listingId
    app.get('/api/listings/:listingId', listings.findOne);

    // Update a Listing with listingId
    app.put('/api/listing/:listingId', listings.update);

    // Delete a Listing with listingId
    app.delete('/api/listings/:listingId', listings.delete);
}