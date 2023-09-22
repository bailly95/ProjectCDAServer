const db = require("../models");
const Comment = db.comment;


exports.createComment = async (req, res) => {
    try {
        const { name, description,taskId,userId } = req.body;
        const comment = await Comment.create({
            name: name,
            description: description,
            taskId:taskId,
            userId:userId
        });
            res.status(201).json(comment);
        
    } catch (err) {
        res.status(500).send({ message: "Error while Comment created: ", err });
    }
};

