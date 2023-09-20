const db = require("../models");
const User = db.user;
const Role = db.role;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mail = require("../mails");

exports.signup = async (req, res) => {
  const {firstname, lastname, email, password} = req.body
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
      await user.setRoles(roles);
      res.status(201).json({ message: "User was registered successfully!" });
    } else {
      await user.setRoles([1]);
      const message = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      //await Mail.newUser(req, res, message);
      res.status(201).json({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "7d", // 7 days
    });

    const roles = await user.getRoles();
    const authorities = roles.map((role) => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User signed out successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};