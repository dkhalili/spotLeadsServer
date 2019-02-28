const Listing = require('../models/listing.model.js');
const Broker = require('../models/broker.model.js');

// Create and Save a new Listing
exports.create = (req, res) => {
    // Validate request
    if(!req.body.address) {
        return res.status(400).send({
            message: "Address can not be empty"
        });
    }


    //Check if Listings exists by Address
    Broker.findOne({"_id" : req.body.broker})
    .then(broker => {
        //If address doesnt already exist
        if(broker) {
            // Create a Listing
            const listing = new Listing({
                address: req.body.address,
                zone: req.body.zone,  
                images: req.body.images || ["image.png", "image2.png"],
                commercial: req.body.commercial || false,
                renter: req.body.renter || true,
                broker: req.body.broker,
                price: req.body.price || "$600"
            });

            // Save Listing in the database
            listing.save()
            .then(data => {
                res.send(data);
               
                broker.listings.push(listing);
                broker.save(function(err) {
                })
                // Broker.findOne({"_id" : req.body.broker}).then(broker => {
                //     broker.listings.push(listing);
                //     broker.save(function(err) {
                //     })

                // });



            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Listing."
                });
            });
           
        }
        else {
            //send existing listing
            return res.status(404).send({
                message: "Broker not found"
            }); 
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving broker with id " + req.body.broker
        });
    });





};

// Retrieve and return all listings from the database.
exports.findAll = (req, res) => {
    Listing.find()
    .then(listings => {
        res.send(listings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listings."
        });
    });
};


exports.findByBroker = (req, res) => {
    Listing.find({broker : req.params.brokerId})
    .then(listings => {
        res.send(listings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listings."
        });
    });
};

exports.findByUser = (req, res) => {
    Listing.find({users : req.params.userId})
    .then(listings => {
        res.send(listings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listings."
        });
    });
};





// Find a single listing with a listingId
exports.findOne = (req, res) => {
    Listing.findById(req.params.listingId)
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });            
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving listing with id " + req.params.listingId
        });
    });
};

// Update a listing identified by the listingId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "Listing can not be empty"
    //     });
    // }

    // Find listing and update it with the request body
    Listing.findByIdAndUpdate(req.params.listingId, {
        address: req.body.address || "18 Address St, 11207, Brooklyn",
        zone: req.body.zone, 
        images: req.body.images || ["image.png", "image2.png"],
        commercial: req.body.commercial || false,
        renter: req.body.renter || true,
        broker: req.body.broker,
        price: req.body.price || "$600"
    }, {new: true})
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error updating listing with id " + req.params.listingId
        });
    });
};

// Delete a listing with the specified listingId in the request
exports.delete = (req, res) => {
    Listing.findByIdAndRemove(req.params.listingId)
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });
        }
        res.send({message: "Listing deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete listing with id " + req.params.listingId
        });
    });
};
