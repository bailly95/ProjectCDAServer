const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./app/routes/auth.routes");
const user = require("./app/routes/user.routes");
const task = require("./app/routes/task.routes");
const project = require("./app/routes/project.routes");
const comment = require("./app/routes/comment.routes");
const article = require("./app/routes/article.routes");


const db = require("./app/models");

const app = express();
//set port
const PORT = process.env.PORT || 5000;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"],
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db.sequelize.sync()
//initialise les role
// db.sequelize.sync({force: true}).then(() => {
//   initial();
// });
// function initial() {
//   db.role.create({
//     id: 1,
//     name: "user"
//   });
//   db.role.create({
//     id: 2,
//     name: "admin"
//   });
// }

// Middleware to set common headers
const setCommonHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
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

app.use("/api/article", article, setCommonHeaders);


//listen for requests
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)})

