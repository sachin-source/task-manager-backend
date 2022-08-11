const Task = require('../models/task');

const listTasks = (req, res) => {
    Task.find({}, (err, tasks) => {
        res.send(tasks);
    })
};

const getTaskById = (req, res) => {
    const { taskId } = req.params;
    Task.find({ _id : taskId }, (err, task) => {
        res.send(task);
    })
};

const updateTaskById = (req, res) => {
    const { taskId } = req.params;
    const { name, discription, assignee, assigner, priority, status } = req.body;
    Task.upadteOne({ _id : taskId }, { name, discription, assignee, assigner, priority, status }, (err, task) => {
        res.send(task);
    })
};

const createTask = (req, res) => {
    const { name, discription, assignee, assigner, priority, status } = req.body;
    Task.insertOne({ name, discription, assignee, assigner, priority, status }, (err, created) => {
        res.send(created);
    })
};

module.exports = { listTasks, getTaskById, updateTaskById, createTask }