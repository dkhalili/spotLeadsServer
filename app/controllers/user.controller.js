const Listing = require('../models/listing.model.js');
const Client = require('../models/client.model.js');
const Broker = require('../models/broker.model.js');
const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.phoneNumber) {
        return res.status(400).send({
            message: "Phone Number can not be empty"
        });
    }


    //Check if user exists by phoneNumber
    User.findOne({"phoneNumber" : req.body.phoneNumber})
    .then(user => {
        //If phoneNumber doesnt already exist
        if(!user) {


            if (req.body.isClient == "true") {
                // Create a User
                const user = new User({
                    phoneNumber: req.body.phoneNumber,
                    isClient: req.body.isClient,
                    fullName: req.body.fullName,
                    commercial: req.body.commercial,
                    renter: req.body.renter,
                    startingDate: req.body.startingDate,
                    price: req.body.price,
                    zipCode: req.body.zipCode,
                    sizeResident: req.body.sizeResident,
                    sizeCommercial: req.body.sizeCommercial
                });


                // Save User in the database
                user.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the User."
                    });
                });

            }
            else if (req.body.isClient == "false") {

                // Create a User
                const user = new User({
                    phoneNumber: req.body.phoneNumber,
                    isClient: req.body.isClient,
                    brokerage: req.body.brokerage,
                    about: req.body.about
                });

                // Save User in the database
                user.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the User."
                    });
                });

            }
            else {
                return res.status(400).send({
                    message: "isClient is required"
                });
            }
            // // Create a User
            // const user = new User({
            //     phoneNumber: req.body.phoneNumber,
            //     userType: req.body.userType,
            //     UserAccount: String

            //     fullName: req.body.fullName || "First Last", 
            //     phoneNumber: req.body.phoneNumber,
            //     commercial: req.body.commercial || false,
            //     renter: req.body.renter || true,
            //     startingDate: req.body.startingDate || "1/16/19",
            //     price: req.body.price || "$400",
            //     zipCode: req.body.zipCode || "11207",
            //     sizeResident: req.body.sizeResident || 2000,
            //     sizeCommercial: req.body.sizeCommercial || 0
            // });

            // // Save User in the database
            // user.save()
            // .then(data => {
            //     res.send(data);
            // }).catch(err => {
            //     res.status(500).send({
            //         message: err.message || "Some error occurred while creating the User."
            //     });
            // });
           
        }
        else {
            //send existing user
            // res.send(user);
            return res.status(400).send({
                message: "Phone Number is already in use"
            });
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with phoneNumber " + req.body.phoneNumber
        });
    });





};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "User can not be empty"
    //     });
    // }


    if(req.body.isClient == "true") {

            // Find user and update it with the request body
            User.findByIdAndUpdate(req.params.userId, {
                fullName: req.body.fullName, 
                commercial: req.body.commercial,
                renter: req.body.renter,
                startingDate: req.body.startingDate,
                price: req.body.price,
                zipCode: req.body.zipCode,
                sizeResident: req.body.sizeResident,
                sizeCommercial: req.body.sizeCommercial
            }, {new: true})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "Client not found with id " + req.params.userId
                    });
                }
                // res.send(user);

                if(req.body.favorites) {
                    Listing.findById(req.body.favorites)
                    .then(listing => {
                        if(!listing) {
                            return res.status(404).send({
                                message: "Listing not found with id " + req.params.listingId
                            });            
                        }

                        user.favorites.push(listing);
                        user.save(function(err) {
                        })

                        listing.users.push(user);
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

                res.send(user);




            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Client not found with id " + req.params.userId
                    });                
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params.userId
                });
            });

    }
    else if (req.body.isClient == "false") {
        // Find broker and update it with the request body
        User.findByIdAndUpdate(req.params.userId, {
            fullName: req.body.fullName, 
            brokerage: req.body.brokerage,
            about: req.body.about,
            reviews: req.body.reviews
        }, {new: true})
        .then(broker => {
            if(!broker) {
                return res.status(404).send({
                    message: "Broker not found with id " + req.params.userId
                });
            }
            res.send(broker);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Broker not found with id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error updating broker with id " + req.params.userId
            });
        });
    }
    else {
            return res.status(400).send({
                message: "isClient is required"
            });
    
    }
};


exports.findAllClients = (req, res) => {
    User.find({isClient : true})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });

};

exports.findAllBrokers = (req, res) => {
    User.find({isClient : false})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving brokers."
        });
    });

};

exports.login = (req, res) => {
    User.findOne({phoneNumber: req.params.phoneNumber})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with phone number " + req.params.phoneNumber
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with phone number " + req.params.phoneNumber
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with phone number " + req.params.phoneNumber
        });
    });
};




exports.addFavorites = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        var exists = false;
        user.favorites.forEach(function myFunction(favoriteId) {
            if (favoriteId == req.body.listingId) {
                exists = true;
            }
        })
        if(exists == false) {

                    Listing.findById(req.body.listingId)
                    .then(listing => {
                        if(!listing) {
                            return res.status(404).send({
                                message: "Listing not found with id " + req.body.listingId
                            });            
                        }

                        user.favorites.push(listing);
                        user.save(function(err) {
                        })

                        listing.users.push(user);
                        listing.save(function(err) {
                        })

                        res.send(user);

                    }).catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Listing not found with id " + req.body.listingId
                            });                
                        }
                        return res.status(500).send({
                            message: "Error retrieving listing with id " + req.body.listingId
                        });
                    });


        }
        else {
            return res.status(400).send({
                message: "Listing with id " + req.params.listingId + "already added to favorites"
            });  
        }



    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};




// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
