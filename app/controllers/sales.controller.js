const Sales = require("../models/sales.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let store = [];

    req.body.data.forEach(element => {
        const sales = new Sales({
            sales_id: req.body.transaksi_kode,
            barang_id: element.barang_id,
            harga_bandrol: element.harga_bandrol,
            qty: element.qty,
            diskon_pct: element.diskon_pct,
            diskon_nilai: element.diskon_nilai,
            harga_diskon: element.harga_diskon,
            total: element.total,
        });
        store = [sales, ...store];
    });


    Sales.create(store, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sales."
            });
        else res.send(data);
    });

};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Sales.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving saless."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Sales.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sales with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sales with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Sales.updateById(
        req.params.id,
        new Sales(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Sales with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Sales with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Sales.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sales with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sales with id " + req.params.id
                });
            }
        } else res.send({ message: `Sales was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Sales.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all saless."
            });
        else res.send({ message: `All Saless were deleted successfully!` });
    });
};
