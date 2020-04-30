const Message = require('../models/message.model.js');
const User = require('../models/user.model.js');
const Listing = require('../models/listing.model.js');
const Conversation = require('../models/conversation.model.js');

// Create and Save a new Conversation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.client || !req.body.broker) {
        return res.status(400).send({
            message: "Client and Broker can not be empty"
        });
    }




	    	User.findById(req.body.client)
	    	.then(client => {
		        if(!client) {
		            return res.status(404).send({
		                message: "Client not found with id " + req.body.client
		            });            
		        }
		        //res.send(client);




			        //check for broker
				    User.findById(req.body.broker)
				    .then(broker => {
				        if(!broker) {
				            return res.status(404).send({
				                message: "Broker not found with id " + req.body.broker
				            });            
				        }
				        // res.send(broker);



				        //Check for Listing
				        Listing.findById(req.body.listing)
					    .then(listing => {
					        if(!listing) {
					            return res.status(404).send({
					                message: "Listing not found with id " + req.body.listing
					            });            
					        }
					        // res.send(listing);



				            // Create a conversation
				            const conversation = new Conversation({
				                client: client, 
				                broker: broker,
				                listing: listing,
				                accepted: false
				            });

				            // Save Conversation in the database
				            conversation.save()
				            .then(data => {
				                res.send(data);
				                
				            }).catch(err => {
				                res.status(500).send({
				                    message: err.message || "Some error occurred while creating the Conversation."
				                });
				            });




					    }).catch(err => {
					        if(err.kind === 'ObjectId') {
					            return res.status(404).send({
					                message: "Listing not found with id " + req.body.listing
					            });                
					        }
					        return res.status(500).send({
					            message: "Error retrieving listing with id " + req.body.listing
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



// Retrieve and return all conversations from the database.
exports.findAll = (req, res) => {
    Conversation.find()
    .then(conversation => {
        res.send(conversation);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving conversations."
        });
    });
};





// Find a conversation with a conversationId
exports.findOne = (req, res) => {
    Conversation.findById(req.params.conversationId)

    .then(conversation => {
        if(!conversation) {
            return res.status(404).send({
                message: "Conversation not found with id " + req.params.conversationId
            });            
        }
        res.send(conversation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Conversation not found with id " + req.params.conversationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Conversation with id " + req.params.conversationId
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



// Update a conversation identified by the conversationId
exports.update = (req, res) => {


    // Find conversation and update it with the request body
    Conversation.findByIdAndUpdate(req.params.conversationId, {
	    
	    accepted: req.body.accepted


    }, {new: true})
    .then(conversation => {
        if(!conversation) {
            return res.status(404).send({
                message: "Conversation not found with id " + req.params.conversationId
            });
        }
        res.send(conversation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Conversation not found with id " + req.params.conversationId
            });                
        }
        return res.status(500).send({
            message: "Error updating conversation with id " + req.params.conversationId
        });
    });


};








exports.findByClient = (req, res) => {

    // Find conversation by userID
    Conversation.find({client : req.params.clientId})
    .then(conversation => {
        if(!conversation) {
            return res.status(404).send({
                message: "Conversation not found with clientId " + req.params.clientId
            });
        }
        res.send(conversation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Conversation not found with clientId " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving conversation with clientId " + req.params.clientId
        });
    });




}





exports.findByBroker = (req, res) => {

    // Find conversation by userID
    Conversation.find({broker : req.params.brokerId})
    .then(conversation => {
        if(!conversation) {
            return res.status(404).send({
                message: "Conversation not found with brokerId " + req.params.brokerId
            });
        }
        res.send(conversation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Conversation not found with brokerId " + req.params.brokerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving conversation with brokerId " + req.params.brokerId
        });
    });




}



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
