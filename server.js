const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieSession = require("cookie-session");

const auth = require("./app/routes/auth.routes");
const user = require("./app/routes/user.routes");
const task = require("./app/routes/task.routes");
const project = require("./app/routes/project.routes");
const comment = require("./app/routes/comment.routes");

const db = require("./app/models");
const Role = db.role;

const app = express();
//set port
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "project-manager-session",
    keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
);

//force sync destroy everything
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "admin"
//   });
// }

//sync for prod
db.sequelize.sync();
// Middleware to set common headers
const setCommonHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
};

// routes

// auth
app.use("/api/auth", auth, setCommonHeaders);

// user
app.use("/api/user", user, setCommonHeaders);

// task
app.use("/api/task", task, setCommonHeaders);

// project
app.use("/api/project", project, setCommonHeaders);

// comment
app.use("/api/comment", comment, setCommonHeaders);

//listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
