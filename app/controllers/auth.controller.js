const db = require("../models");
const User = db.user;
const Role = db.role;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mail = require("../mails");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      const result = user.setRoles([1]);

      const message = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      if (result)
        res.status(201).send({ message: "User registered successfully!" });
      //if (result) await Mail.newUser(req, res, message);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "7d", // 7 days
    });
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    res.status(200).send({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: authorities,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
