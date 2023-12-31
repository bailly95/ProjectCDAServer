const db = require("../models");
const Project = db.project;
const User = db.user;
const Task = db.task;
const Comment = db.comment;
const Mail = require("../mails");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await User.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const project = await Project.create({
      name: name,
      createdBy: userId,
    });
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send({ message: "User Not found." });
    } else {
      await user.addProject(project);
      res.status(201).send({ message: "Project created successfully." });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error while adding Project to User: ", err });
  }
};



exports.getProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.findAll({
      where: {
        projectId: projectId,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
          }
        },
      ],
    });
    const project = await Project.findByPk(projectId);
    res.status(200).json({tasks, project});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
}

  exports.deleteProject = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const project = await Project.findByPk(projectId);
      if (!project) {
        res.status(404).send({ message: "Project not found." });
      } else {
        await project.destroy();
        res.status(200).send({ message: "Project deleted successfully." });
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error while deleting Project: ", err });
    }
  }

  exports.assignProject = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const email = req.body.email.email;
      const project = await Project.findByPk(projectId);
      const creator = await User.findByPk(project.createdBy);
      if (!project) {
        res.status(404).send({ message: "Project not found." });
      } 
      const user = await User.findOne({
        where: {
          email: email,
        },
      })
      if (!user) {
        res.status(404).send({ message: "User not found." });
      } 

      const notif = await Notification.create({
        userId: user.id,
        description: "Vous avez été assigné au projet" + project.name+" de "+creator.firstname + " " + creator.lastname,
        link: `${process.env.API_URL}/project/assign/${creator.id}/${user.id}/project/${project.id}`
      })
      const message = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      await Mail.assign(req, res, message);

    } catch (err) {
      res
        .status(500)
        .send({ message: "Error while assigning Project to User: ", err });
    }
  }