const Conversation = require('../models/conversation.model.js');
const User = require('../models/user.model.js');
const Message = require('../models/message.model.js');

// Create and Save a new Listing
exports.create = (req, res) => {
    // Validate request
    if(!req.body.conversationId) {
        return res.status(400).send({
            message: "ConversationId can not be empty"
        });
    }
    if(!req.body.sender || !req.body.receiver) {
        return res.status(400).send({
            message: "Sender and Receiver can not be empty"
        });
    }



                //Check if Conversation exists
                Conversation.findOne({"_id" : req.body.conversationId})
                .then(conversation => {

                        // Create a Message
                        const message = new Message({
                            message: req.body.message,
                            sender: req.body.sender,  
                            receiver: req.body.receiver,
                            conversationId: req.body.conversationId

                        });


                        // Save Listing in the database
                        message.save()
                        .then(data => {
                            res.send(data);
                           
                            conversation.messages.push(message);
                            conversation.save(function(err) {
                            })




                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Message."
                            });
                        });
                    
                   



                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Conversation not found with id " + req.body.conversationId
                        });                
                    }
                    return res.status(500).send({
                        message: "Error retrieving Conversation with id " + req.body.conversationId
                    });
                });

};



exports.createQR = (req, res) => {
    // Validate request

    if(!req.body.sender || !req.body.receiver) {
        return res.status(400).send({
            message: "Sender and Receiver can not be empty"
        });
    }



            User.findById(req.body.sender)
            .then(client => {
                if(!client) {
                    return res.status(404).send({
                        message: "Client not found with id " + req.body.sender
                    });            
                }
                //res.send(client);




                    //check for broker
                    User.findById(req.body.receiver)
                    .then(broker => {
                        if(!broker) {
                            return res.status(404).send({
                                message: "Broker not found with id " + req.body.receiver
                            });            
                        }
                        // res.send(broker);



                        // Create a conversation
                        const conversation = new Conversation({
                            client: client, 
                            broker: broker,
                            accepted: true
                        });

                        // Save Conversation in the database
                        conversation.save()
                        .then(data => {
                            // res.send(data);
                            
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Conversation."
                            });
                        });



                        // Create a Message
                        const message = new Message({
                            message: req.body.message,
                            sender: req.body.sender,  
                            receiver: req.body.receiver,
                            conversationId: conversation._id

                        });

                        // Save Message in the database
                        message.save()
                        .then(data => {

                           
                            conversation.messages.push(message);
                            conversation.save(function(err) {
                            })

                            res.send(data);



                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Message."
                            });
                        });





                    }).catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Broker not found with id " + req.body.broker
                            });                
                        }
                        return res.status(500).send({
                            message: "Error retrieving user with id " + req.body.broker
                        });
                    });    






            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Client not found with id " + req.body.client
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving user with id " + req.body.client
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





// Find a message with a messageId
exports.findOne = (req, res) => {
    Message.findById(req.params.messageId)


    .then(message => {
        if(!message) {
            return res.status(404).send({
                message: "Messages not found with id " + req.params.messageId
            });            
        }
        res.send(message);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Messages not found with id " + req.params.messageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Messages with id " + req.params.messageId
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
