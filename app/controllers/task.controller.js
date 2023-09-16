const db = require("../models");
const Task = db.task;
const Project = db.project;

exports.createTask = async (req, res) => {
    try {
        const { name, description,duration,projectId } = req.body;
        const task = await Task.create({
            name: name,
            description: description,
            duration: duration
        });
        const project = await Project.findByPk(projectId);
        if (!project) {
            res.status(404).send({ message: "Project Not found." });
        } else {
            await project.addProject(task);
            res.status(201).send({ message: "Task created successfully." });
        }
    } catch (err) {
        res.status(500).send({ message: "Error while adding Task to Project: ", err });
    }
};

exports.updateTask = (req, res) => {
    res.status(500).send({
        message: "Not implemented!"
    });
};