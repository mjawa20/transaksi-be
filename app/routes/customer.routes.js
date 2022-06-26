module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customers
  router.post("/", customers.create);

  // Retrieve all Customerss
  router.get("/", customers.findAll);

  // Retrieve a single Customers with id
  router.get("/:id", customers.findOne);

  // Update a Customers with id
  router.put("/:id", customers.update);

  // Delete a Customers with id
  router.delete("/:id", customers.delete);

  // Delete all Customerss
  router.delete("/", customers.deleteAll);

  app.use('/api/customers', router);
};
