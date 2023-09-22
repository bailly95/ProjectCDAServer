const db = require("../models");
const Task = db.task;
const Project = db.project;

exports.createTask = async (req, res) => {
    try {
        const { name, description,duration,projectId } = req.body;
        const task = await Task.create({
            name: name,
            description: description,
            duration: duration,
            projectId:projectId
        });
            res.status(201).send({ message: "Task created successfully." });
        
    } catch (err) {
        res.status(500).send({ message: "Error while adding Task to Project: ", err });
    }
};

exports.updateTask = (req, res) => {
    res.status(500).send({
        message: "Not implemented!"
    });
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).send({
        message: `Task with id=${taskId} not found`
      });
    }

    await task.destroy();
    
    res.send({
      message: "Task deleted successfully"
    });

  } catch (err) {
    res.status(500).send({
      message: "Error deleting task with id=" + taskId
    });
  }
};
