const Task = require('../models/task');
const User = require('../models/user');

const request = require('request');

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
    Task.updateOne({ _id: taskId }, updateJson, (err, task) => {
        res.send({status : !Boolean(err)});
    })
};

const createTask = (req, res) => {
    if (req?.user?.role == 'admin') {
        const { name, description, assignee, priority, progress, deadline, hasPriority, hasDeadline } = req.body;
        Task.create({ name, description, assignee, assigner: req.user.email, priority, progress, deadline, hasPriority, hasDeadline }, (err, task) => {
            User.findOne({ email : assignee }, (err, userInfo) => {
                console.log('userInfo : ', userInfo)
                if (err) {
                    return res.send ({status : false, message : "Error finding the user"});
                }

                userInfo.notificationToken.forEach((notificationToken) => {
                    request.post({
                        url:'https://fcm.googleapis.com/fcm/send',
                        headers : { 'Content-Type' : 'application/json', 'Authorization' : 'key=AAAAeWm0fFc:APA91bF4PZtMFUQx9Hcvw6CCBtrCxjy8tL6ND6ziBHotiNwdl2-4kA6nY7XBKef8iFPA8NqgjMvKhXFR10pmMiBDexQmy7ouyU8xjciXc1KGkz5j58rbO4nM3hD19ma9oTUVbVtlirzO' },
                        body : JSON.stringify({
                            "notification": {
                                "title": req.user.name + " has assigned a new task to you",
                                "body": name ,
                                "click_action": "https://basava-consultants.netlify.app/",
                                "icon": "https://i.imgur.com/5zO5cce.png"
                            },
                            "to": notificationToken
                        })
                    }, function(err,httpResponse,body){
                        console.log('err : ', err, 'httpResponse : ', httpResponse, 'body : ', body)
                    })
                })

                // res.send({status : !Boolean(err), task});
            } )
        })
    } else {
        res.status(400).send({ status: false, message: "You are not authorized to perform this action" });
    }
};

const deleteUsers = () => {}

module.exports = { listTasks, getTaskById, updateTaskById, createTask }