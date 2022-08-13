const Task = require('../models/task');

const listTasks = (req, res) => {
    console.log(req.user);
    const params = req?.user?.role == 'admin' ? { assigner: req.user.email } : { assignee: req.user.email };
    Task.find(params, (err, tasks) => {
        res.send({ status: !Boolean(err), tasks });
    })
};

const getTaskById = (req, res) => {
    const { taskId } = req.params;
    Task.find({ _id: taskId }, (err, task) => {
        res.send(task);
    })
};

const updateTaskById = (req, res) => {
    const { taskId } = req.params;
    const { name, discription, assignee, assigner, priority, status } = req.body;
    Task.upadteOne({ _id: taskId }, { name, discription, assignee, assigner, priority, status }, (err, task) => {
        res.send(task);
    })
};

const createTask = (req, res) => {
    if (req?.user?.role == 'admin') {
        const { name, description, assignee, priority, status, deadline, hasPriority, hasDeadline } = req.body;
        Task.create({ name, description, assignee, assigner: req.user.email, priority, status, deadline, hasPriority, hasDeadline }, (err, created) => {
            res.send(created);
        })
    } else {
        res.status(400).send({ status: false, message: "You are not authorized to perform this action" });
    }
};

module.exports = { listTasks, getTaskById, updateTaskById, createTask }