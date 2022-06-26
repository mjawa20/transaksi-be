module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customers
    router.post("/", transactions.create);
  
    // Retrieve all Customerss
    router.get("/", transactions.findAll);
  
    // Retrieve a single Customers with id
    router.get("/:id", transactions.findOne);
  
    // Update a Customers with id
    router.put("/:id", transactions.update);
  
    // Delete a Customers with id
    router.delete("/:id", transactions.delete);
  
    // Delete all Customerss
    router.delete("/", transactions.deleteAll);
  
    app.use('/api/transaction', router);
  };
  