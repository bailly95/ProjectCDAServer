const db = require("../models");
const Project = db.project;
const User = db.user;
const userController = require("../controllers/user.controller");


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await User.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.createProject = async (req, res) => {
    try {
        const { userId, projectName } = req.body;
        const project = await Project.create({
            name: projectName,
            createdBy: userId
        });
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send({ message: "User Not found." });
        } else {
            await user.addProject(project);
            res.status(201).send({ message: "Project created successfully." });
        }
    } catch (err) {
        res.status(500).send({ message: "Error while adding Project to User: ", err });
    }
};


