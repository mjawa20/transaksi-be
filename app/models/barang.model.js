const sql = require("./db.js");

// constructor
const Product = function (barang) {
  this.kode = barang.kode;
  this.nama = barang.nama;
  this.harga = barang.harga;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO m_barangs SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created barang: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM m_barangs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found barang: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (title, result) => {
  let query = "SELECT * FROM m_barangs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("barangs: ", res);
    result(null, res);
  });
};

Product.updateById = (id, barang, result) => {
  sql.query(
    "UPDATE m_barangs SET nama = ?, harga = ? WHERE id = ?",
    [barang.nama, barang.harga, id],
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

      console.log("updated barang: ", { id: id, ...barang });
      result(null, { id: id, ...barang });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM m_barangs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted barang with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM barangs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} barangs`);
    result(null, res);
  });
};

module.exports = Product;
