const { uid } = require("uid");
const Transaction = require("../models/transaction.model.js");

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Transaction
    const transaction = new Transaction({
        kode: uid(4),
        nama: req.body.nama,
        tgl: req.body.tgl,
        mcustomer_id: req.body.mcustomer_id,
        subtotal: req.body.subtotal,
        diskon: req.body.diskon,
        ongkir: req.body.ongkir,
        total_bayar: req.body.total_bayar,
    });

    // Save Transaction in the database
    Transaction.create(transaction, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transaction."
            });
        else res.send(data);
    });
};

// Retrieve all Transactions from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Transaction.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transactions."
            });
        else res.send(data);
    });
};

// Find a single Transaction by Id
exports.findOne = (req, res) => {
    Transaction.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Transaction with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Transaction with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Transactions

// Update a Transaction identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Transaction.updateById(
        req.params.id,
        new Transaction(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Transaction with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Transaction with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
    Transaction.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Transaction with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Transaction with id " + req.params.id
                });
            }
        } else res.send({ message: `Transaction was deleted successfully!` });
    });
};

// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
    Transaction.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all transactions."
            });
        else res.send({ message: `All Transactions were deleted successfully!` });
    });
};
