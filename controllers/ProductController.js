const db = require("../models/index");
const Product = db.ProductModel;

exports.AllProduct = async (req, res) => {
  await Product.findAll({
    attributes: ["id", "name", "price", "sellingprice", "description"],
  })
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Somthing wrong!",
      });
    });
};

exports.StoreProduct = async (req, res) => {
  const { name, price, sellingprice, description, image } = req.body;

  let data = await Product.create({
    name,
    price,
    sellingprice,
    description,
    image,
  })
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.ShowProduct = async (req, res) => {
  const id = req.params.id;
  await Product.findByPk(id, {
    attributes: ["id", "name", "price", "sellingprice", "description"],
  })
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.UpdateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, sellingprice, description, image } = req.body;

  await Product.update(
    { name, price, sellingprice, description, image },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Product Updated",
        });
      } else {
        res.json({
          message: "Product Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.DeleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Product Deleted",
        });
      } else {
        res.json({
          message: "Product Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
