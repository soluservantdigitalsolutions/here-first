const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect/dbConnect");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/routes");
dotenv.config();

// ...
//middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("it is working");
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message, stack: err.stack });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  dbConnect();
});
