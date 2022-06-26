const sql = require("./db.js");

// constructor
const Transaction = function (transaction) {
    this.kode = transaction.kode;
    this.tgl = transaction.tgl;
    this.mcustomer_id = transaction.mcustomer_id;
    this.subtotal = transaction.subtotal;
    this.diskon = transaction.diskon;
    this.ongkir = transaction.ongkir;
};

Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO t_sales SET ?", newTransaction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created transaction: ", { id: res.insertId, ...newTransaction });
        result(null, { id: res.insertId, ...newTransaction });
    });
};

Transaction.findById = (id, result) => {
    sql.query(`SELECT * FROM t_sales WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found transaction: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Transaction with the id
        result({ kind: "not_found" }, null);
    });
};

Transaction.getAll = (kode, result) => {
    let query = "SELECT * FROM t_sales";

    if (kode) {
        query += ` WHERE kode LIKE '%${kode}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("transactions: ", res);
        result(null, res);
    });
};

Transaction.updateById = (id, transaction, result) => {
    sql.query(
        "UPDATE t_sales SET kode = ?, telp = ? WHERE id = ?",
        [transaction.kode, transaction.telp, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Transaction with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated transaction: ", { id: id, ...transaction });
            result(null, { id: id, ...transaction });
        }
    );
};

Transaction.remove = (id, result) => {
    sql.query("DELETE FROM transactions WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Transaction with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted transaction with id: ", id);
        result(null, res);
    });
};

Transaction.removeAll = result => {
    sql.query("DELETE FROM transactions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} transactions`);
        result(null, res);
    });
};

module.exports = Transaction;
