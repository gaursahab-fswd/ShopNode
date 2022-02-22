const db = require("../models/index");
const Order = db.OrderModel;

exports.AllOrder = async (req, res) => {
  await Order.findAll({
    attributes: [
      "userid",
      "orderno",
      "date",
      "quatity",
      "totalprice",
      "products",
    ],
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

exports.StoreOrder = async (req, res) => {
  const { userid, orderno, date, quatity, totalprice, products } = req.body;

  let data = await Order.create({
    userid,
    orderno,
    date,
    quatity,
    totalprice,
    products,
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

exports.ShowOrder = async (req, res) => {
  const id = req.params.id;
  await Order.findByPk(id, {
    attributes: [
      "userid",
      "orderno",
      "date",
      "quatity",
      "totalprice",
      "products",
    ],
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

exports.UpdateOrder = async (req, res) => {
  const id = req.params.id;
  const { userid, orderno, date, quatity, totalprice, products } = req.body;

  await Order.update(
    { userid, orderno, date, quatity, totalprice, products },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Order Updated",
        });
      } else {
        res.json({
          message: "Order Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.DeleteOrder = async (req, res) => {
  const id = req.params.id;
  await Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Order Deleted",
        });
      } else {
        res.json({
          message: "Order Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
