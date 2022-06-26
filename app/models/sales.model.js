const sql = require("./db.js");

const Sales = function (customer) {
  this.sales_id = customer.sales_id;
  this.barang_id = customer.barang_id;
  this.harga_bandrol = customer.harga_bandrol;
  this.qty = customer.qty;
  this.diskon_pct = customer.diskon_pct;
  this.diskon_nilai = customer.diskon_nilai;
  this.harga_diskon = customer.harga_diskon;
  this.total = customer.total;
};

Sales.create = (newSales, result) => {
  sql.query("INSERT INTO t_sales_dets SET ?", newSales, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newSales });
    result(null, { id: res.insertId, ...newSales });
  });
};

Sales.findById = (id, result) => {
  sql.query(`SELECT * FROM t_sales_dets WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Sales.getAll = (nama, result) => {
  let query = "SELECT * FROM t_sales_dets";

  if (nama) {
    query += ` WHERE nama LIKE '%${nama}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE t_sales_dets SET nama = ?, telp = ? WHERE id = ?",
    [customer.nama, customer.telp, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Sales.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Sales.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Sales;
