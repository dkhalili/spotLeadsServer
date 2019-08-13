const Listing = require('../models/listing.model.js');
const Client = require('../models/client.model.js');

// // Create and Save a new client
// exports.create = (req, res) => {
//     // Validate request
//     if(!req.body.phoneNumber) {
//         return res.status(400).send({
//             message: "Phone Number can not be empty"
//         });
//     }


//     //Check if client exists by phoneNumber
//     Client.findOne({"phoneNumber" : req.body.phoneNumber})
//     .then(client => {
//         //If phoneNumber doesnt already exist
//         if(!client) {
//             // Create a Client
//             const client = new Client({
//                 fullName: req.body.fullName || "First Last", 
//                 phoneNumber: req.body.phoneNumber,
//                 commercial: req.body.commercial || false,
//                 renter: req.body.renter || true,
//                 startingDate: req.body.startingDate || "1/16/19",
//                 price: req.body.price || "$400",
//                 zipCode: req.body.zipCode || "11207",
//                 sizeResident: req.body.sizeResident || 2000,
//                 sizeCommercial: req.body.sizeCommercial || 0
//             });

//             // Save Client in the database
//             client.save()
//             .then(data => {
//                 res.send(data);
//             }).catch(err => {
//                 res.status(500).send({
//                     message: err.message || "Some error occurred while creating the Client."
//                 });
//             });
           
//         }
//         else {
//             //send existing client
//             res.send(client);
//         }
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Client not found"
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving client with phoneNumber " + req.body.phoneNumber
//         });
//     });
// };

// Retrieve and return all clients from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

// Find a single client with a clientId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving client with id " + req.params.clientId
        });
    });
};

// Update a client identified by the clientId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "Client can not be empty"
    //     });
    // }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        fullName: req.body.fullName || "First Last", 
        // phoneNumber: req.body.phoneNumber,
        commercial: req.body.commercial || false,
        renter: req.body.renter || true,
        startingDate: req.body.startingDate || "1/16/19",
        price: req.body.price || "$400",
        zipCode: req.body.zipCode || "11207",
        sizeResident: req.body.sizeResident || 2000,
        sizeCommercial: req.body.sizeCommercial || 0
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        // res.send(client);

        if(req.body.favorites) {
            Listing.findById(req.body.favorites)
            .then(listing => {
                if(!listing) {
                    return res.status(404).send({
                        message: "Listing not found with id " + req.params.listingId
                    });            
                }

                client.favorites.push(listing);
                client.save(function(err) {
                })

                listing.clients.push(client);
                listing.save(function(err) {
                })


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
        }

        res.send(client);




    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.clientId
        });
    });
};

// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.clientId
        });
    });
};
