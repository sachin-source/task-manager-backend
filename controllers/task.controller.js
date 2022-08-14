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
    Task.findOne({ _id: taskId }, (err, task) => {
        res.send({ status: !Boolean(err), task });
    })
};

const updateTaskById = (req, res) => {
    const { taskId } = req.params;
    const { name, discription, assignee, priority, progress, deadline, hasPriority, hasDeadline } = req.body;
    const updateJson = req?.user?.role == 'admin' ? { name, discription, assignee, priority, progress, deadline, hasPriority, hasDeadline } : { progress };
    Task.upadteOne({ _id: taskId }, updateJson, (err, task) => {
        res.send({status : !Boolean(err), task});
    })
};

const createTask = (req, res) => {
    if (req?.user?.role == 'admin') {
        const { name, description, assignee, priority, progress, deadline, hasPriority, hasDeadline } = req.body;
        Task.create({ name, description, assignee, assigner: req.user.email, priority, progress, deadline, hasPriority, hasDeadline }, (err, task) => {
            res.send({status : !Boolean(err), task});
        })
    } else {
        res.status(400).send({ status: false, message: "You are not authorized to perform this action" });
    }
};

module.exports = { listTasks, getTaskById, updateTaskById, createTask }