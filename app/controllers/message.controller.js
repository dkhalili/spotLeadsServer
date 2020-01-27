const Message = require('../models/message.model.js');

// Create and Save a new Listing
exports.create = (req, res) => {
    // Validate request
    if(!req.body.sender || !req.body.receiver) {
        return res.status(400).send({
            message: "Sender and Receiver can not be empty"
        });
    }


            // Create a message
            const message = new Message({
                message: req.body.message, 
                sender: req.body.sender,
                receiver: req.body.receiver
            });

            // Save Listing in the database
            message.save()
            .then(data => {
                res.send(data);



            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Listing."
                });
            });
           
        




};

// Retrieve and return all messages from the database.
exports.findAll = (req, res) => {
    Message.find()
    .then(message => {
        res.send(message);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    });
};





// Find a message with a userId
exports.findOne = (req, res) => {
    Message.find({ $or : [ { sender : req.params.userId }, { receiver : req.params.userId } ] })


    .then(message => {
        if(!message) {
            return res.status(404).send({
                message: "Messages not found with id " + req.params.userId
            });            
        }
        res.send(message);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Messages not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Messages with id " + req.params.userId
        });
    });
};









exports.findByIds = (req, res) => {
    // Message.find({ sender: req.params.userId, receiver: req.params.userId})
    // Message.find({ user: req.params.userId, broker: req.params.brokerId})
    // Message.find( { sender: { $in: [req.params.userId, req.params.brokerId] }, receiver: { $in: [req.params.userId, req.params.brokerId] } })
    // Message.find( { $or: [ { sender: req.params.userId}, { receiver: req.params.userId } ] } )
    // Message.find( { $and: [ { sender: req.params.userId}, { receiver: req.params.brokerId } ] } )
    // Message.find( { $or: [ { $and: [ { sender: req.params.userId}, { receiver: req.params.brokerId } ] }, { $and: [ { sender: req.params.brokerId}, { receiver: req.params.userId } ] } ] } )

    Message.find( {
    $or : 
        [
            { $or : [ { sender : req.params.userId }, { receiver : req.params.userId } ] },
            { $or : [ { sender : req.params.brokerId  }, { receiver :  req.params.brokerId }] }
        ]
    } )
    .then(messages => {
        res.send(messages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    });
};

// exports.findByUser = (req, res) => {
//     Listing.find({users : req.params.userId})
//     .then(listings => {
//         res.send(listings);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving listings."
//         });
//     });
// };





// // Find a single listing with a listingId
// exports.findOne = (req, res) => {
//     Listing.findById(req.params.listingId)
//     .then(listing => {
//         if(!listing) {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });            
//         }
//         res.send(listing);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving listing with id " + req.params.listingId
//         });
//     });
// };

// // Update a listing identified by the listingId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     // if(!req.body.email) {
//     //     return res.status(400).send({
//     //         message: "Listing can not be empty"
//     //     });
//     // }

//     // Find listing and update it with the request body
//     Listing.findByIdAndUpdate(req.params.listingId, {
//         address: req.body.address || "18 Address St, 11207, Brooklyn", 
//         images: req.body.images || ["image.png", "image2.png"],
//         commercial: req.body.commercial || false,
//         renter: req.body.renter || true,
//         broker: req.body.broker,
//         price: req.body.price || "$600"
//     }, {new: true})
//     .then(listing => {
//         if(!listing) {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });
//         }
//         res.send(listing);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating listing with id " + req.params.listingId
//         });
//     });
// };

// // Delete a listing with the specified listingId in the request
// exports.delete = (req, res) => {
//     Listing.findByIdAndRemove(req.params.listingId)
//     .then(listing => {
//         if(!listing) {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });
//         }
//         res.send({message: "Listing deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Listing not found with id " + req.params.listingId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete listing with id " + req.params.listingId
//         });
//     });
// };
