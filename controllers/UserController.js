const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.UserModel;

exports.GetUser = async (req, res) => {
  await User.findAll({
    attributes: ["name", "phone", "email"],
    where: { role: 2 },
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

exports.StoreUser = async (req, res) => {
  const { name, phone, email, pass } = req.body;
  const password = await bcrypt.hash(pass, 10);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let data = await User.create({ name, phone, email, password })
    .then((data) => {
      res
        .json({
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
        .status(200);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.EditUser = async (req, res) => {
  await User.findByPk(
    {
      attributes: ["name", "phone", "email"],
    },
    req.params.id
  )
    .then((data) => {
      res
        .json({
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
        .status(200);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.UpdateUser = async (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(400).json({ errors: errors.array() });
  }

  await User.update(
    { name, phone, email },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "User Updated",
        });
      } else {
        res.json({
          message: "User Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.DeleteUser = async (req, res) => {
  const id = req.params.id;
  await User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "User Deleted",
        });
      } else {
        res.json({
          message: "User Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
