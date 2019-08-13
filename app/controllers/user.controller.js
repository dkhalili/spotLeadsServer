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


            if (req.body.userType == "Client") {
                const client = new Client;
                client.save()
                // .then(data => {
                //     res.send(data);
                // })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Client."
                    });
                });

                // Create a User
                const user = new User({
                    phoneNumber: req.body.phoneNumber,
                    userType: req.body.userType,
                    UserAccount: client.id
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
            else if (req.body.userType == "Broker") {
                const broker = new Broker;
                broker.save()
                // .then(data => {
                //     res.send(data);
                // })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Broker."
                    });
                });

                // Create a User
                const user = new User({
                    phoneNumber: req.body.phoneNumber,
                    userType: req.body.userType,
                    UserAccount: broker.id
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

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
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
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
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
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
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
