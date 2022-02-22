const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const db = require("./models");
db.sequelize.sync({ force: false });
const bodyParser = require("body-parser");
const routes = require("router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
