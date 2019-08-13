const Broker = require('../models/broker.model.js');

// Create and Save a new Broker
exports.create = (req, res) => {
    // Validate request
    if(!req.body.phoneNumber) {
        return res.status(400).send({
            message: "Phone Number can not be empty"
        });
    }


    //Check if Broker exists by phoneNumber
    Broker.findOne({"phoneNumber" : req.body.phoneNumber})
    .then(broker => {
        //If phoneNumber doesnt already exist
        if(!broker) {
            // Create a Broker
            const broker = new Broker({
                fullName: req.body.fullName || "First Last", 
                phoneNumber: req.body.phoneNumber,
                brokerage: req.body.brokerage || "Broker Brothers",
                about: req.body.about || "We are brokers and we are brothers.",
                reviews: req.body.reviews || ["These brothers are great", "Amazing brokers and even better brothers."]
            });

            // Save Broker in the database
            broker.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Broker."
                });
            });
           
        }
        else {
            //send existing broker
            res.send(broker);
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Broker not found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Broker with phoneNumber " + req.body.phoneNumber
        });
    });

};

// Retrieve and return all brokers from the database.
exports.findAll = (req, res) => {
    Broker.find()
    .then(brokers => {
        res.send(brokers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving brokers."
        });
    });
};

// Find a single broker with a brokerId
exports.findOne = (req, res) => {
    Broker.findById(req.params.brokerId)
    .then(broker => {
        if(!broker) {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });            
        }
        res.send(broker);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving broker with id " + req.params.brokerId
        });
    });
};

// Update a broker identified by the brokerId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "Broker can not be empty"
    //     });
    // }

    // Find broker and update it with the request body
    Broker.findByIdAndUpdate(req.params.brokerId, {
        fullName: req.body.fullName || "First Last", 
        brokerage: req.body.brokerage || "Broker Brothers",
        about: req.body.about || "We are brokers and we are brothers.",
        reviews: req.body.reviews || ["These brothers are great", "Amazing brokers and even better brothers."]
    }, {new: true})
    .then(broker => {
        if(!broker) {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });
        }
        res.send(broker);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });                
        }
        return res.status(500).send({
            message: "Error updating broker with id " + req.params.brokerId
        });
    });
};

// Delete a broker with the specified brokerId in the request
exports.delete = (req, res) => {
    Broker.findByIdAndRemove(req.params.brokerId)
    .then(broker => {
        if(!broker) {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });
        }
        res.send({message: "Broker deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Broker not found with id " + req.params.brokerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete broker with id " + req.params.brokerId
        });
    });
};
