const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;

db.Sequelize = Sequelize;

db.user = require("../models/user.model.js")(sequelize);
db.role = require("../models/role.model.js")(sequelize);
db.comment = require("../models/comment.model.js")(sequelize);
db.project = require("../models/project.model.js")(sequelize);
db.task = require("../models/task.model.js")(sequelize);
db.article = require("../models/article.model.js")(sequelize);

//role => user
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

//user => task
db.user.belongsToMany(db.task, {
  through: "user_tasks",
});
db.task.belongsToMany(db.user, {
  through: "user_tasks",
});

//user => project
db.user.belongsToMany(db.project, {
  through: "user_projects",
});
db.project.belongsToMany(db.user, {
  through: "user_projects",
});

//user => project
db.user.hasOne(db.project, {
  foreignKey: "createdBy",
});
db.project.belongsTo(db.user, {
  foreignKey: "createdBy",
});
//project => task
db.project.hasOne(db.task);
db.task.belongsTo(db.project);
//task => comment
db.task.hasOne(db.comment);
db.comment.belongsTo(db.task);
//user => comment
db.user.hasOne(db.comment);
db.comment.belongsTo(db.user);

db.ROLES = ["user", "admin"];

module.exports = db;
