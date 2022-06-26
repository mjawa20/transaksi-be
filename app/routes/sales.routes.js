module.exports = app => {
    const sales = require("../controllers/sales.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customers
    router.post("/", sales.create);
  
    // Retrieve all Customerss
    router.get("/", sales.findAll);
  
    // Retrieve a single Customers with id
    router.get("/:id", sales.findOne);
  
    // Update a Customers with id
    router.put("/:id", sales.update);
  
    // Delete a Customers with id
    router.delete("/:id", sales.delete);
  
    // Delete all Customerss
    router.delete("/", sales.deleteAll);
  
    app.use('/api/sales', router);
  };
  