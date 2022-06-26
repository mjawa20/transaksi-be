const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to server transaksi jawa." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/barang.routes.js")(app);
require("./app/routes/transaction.routes.js")(app);
require("./app/routes/sales.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
