const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Project = db.project;

verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return res.status(401).json({ message: "not authenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });

    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      return next();
    }
  }

  res.status(403).send({
    message: "Require Admin Role!",
  });
};

isProjectOwner = async (req, res, next) => {
  const creatorId = parseInt(req.params.creatorId);
  const projectId = req.params.projectId;

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    if (project.createdBy !== creatorId) {
      return res
        .status(403)
        .json({
          message: "Vous n'avez pas l'autorisation pour assigner à ce projet",
        });
    }

    next();
  } catch (error) {
    console.error("Error checking project owner:", error);
    return res.status(500).json({ message: "Erreur du serveur" });
  }
};

const authJwtMiddleware = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isProjectOwner: isProjectOwner,
};
module.exports = authJwtMiddleware;