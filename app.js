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

const OrderController = require("./controllers/OrderController");
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
//Product Route
router.get("/product", ProductController.AllProduct);
router.post("/product", ProductController.StoreProduct);
router.get("/product/:id", ProductController.ShowProduct);
router.put("/product/:id", ProductController.UpdateProduct);
router.delete("/product/:id", ProductController.DeleteProduct);
//Order Route
router.get("/order", OrderController.AllOrder);
router.post("/order", OrderController.StoreOrder);
router.get("/order/:id", OrderController.ShowOrder);
router.put("/order/:id", OrderController.UpdateOrder);
router.delete("/order/:id", OrderController.DeleteOrder);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
