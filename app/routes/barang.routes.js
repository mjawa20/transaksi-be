module.exports = app => {
    const barangs = require("../controllers/barang.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customers
    router.post("/", barangs.create);
  
    // Retrieve all Customerss
    router.get("/", barangs.findAll);
  
    // Retrieve a single Customers with id
    router.get("/:id", barangs.findOne);
  
    // Update a Customers with id
    router.put("/:id", barangs.update);
  
    // Delete a Customers with id
    router.delete("/:id", barangs.delete);
  
    // Delete all Customerss
    router.delete("/", barangs.deleteAll);
  
    app.use('/api/barang', router);
  };
  