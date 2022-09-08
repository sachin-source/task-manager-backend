const Task = require('../models/task');
const User = require('../models/user');

const request = require('request');

const listTasks = (req, res) => {
    // console.log(req.user);
    const params = req?.user?.role == 'admin' ? { assigner: req.user.email } : { assignee: req.user.email };
    return Task.find(params, null, {sort: {createdAt: -1}}, (err, tasks) => {
        // console.log("tasks list : ", err, tasks)
        return res.send({ status: !Boolean(err), tasks });
    })
};

const listIndividualTasks = (req, res) => {
    // console.log(req.user);
    const {assignee } = req.query;
    return req?.user?.role == 'admin' ? Task.find({ assigner: req.user.email , assignee }, null, {sort: {createdAt: -1}}, (err, tasks) => {
        // console.log("tasks list : ", err, tasks)
        return res.send({ status: !Boolean(err), tasks });
    }) : res.send({ status : false, message : "Unprivilaged role"});
};

const getTaskById = (req, res) => {
    const { taskId } = req.params;
    return Task.findOne({ _id: taskId }, (err, task) => {
        return res.send({ status: !Boolean(err), task });
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
        return Task.create({ name, description, assignee, assigner: req.user.email, priority, progress, deadline, hasPriority, hasDeadline }, (err, task) => {
            if(err) {
                return res.send({status : false})
            }
            return User.findOne({ email : assignee }, (err, userInfo) => {
                // console.log('userInfo : ', userInfo)
                if (err) {
                    return res.send ({status : false, message : "Error finding the user"});
                }

                const notificationPromises =  userInfo.notificationToken.map((notificationToken) => {
                    return new Promise ((resolve, reject) => {
                        return request.post({
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
                            // console.log('err : ', err, 'httpResponse : ', httpResponse, 'body : ', body)
                            err ? reject(err) : resolve(body);
                        })
                    })
                })

                Promise.allSettled(notificationPromises).then((data) => {
                    return res.send({status : !Boolean(err), task});
                }).catch((e) => {
                    return res.send({status : false})
                })
            })
        })
    } else {
        res.status(400).send({ status: false, message: "You are not authorized to perform this action" });
    }
};

const notify = (req, res) => {
    const {taskId } = req.params;

    Task.findById(taskId).then((taskData) => {
        // console.log(taskData)
        // res.send(taskData)

        User.findOne({ email : taskData.assignee }, (err, userInfo) => {
            // console.log('userInfo : ', userInfo)
            if (err) {
                return res.send ({status : false, message : "Error finding the user"});
            }

            const notificationPromises =  userInfo?.notificationToken.map((notificationToken) => {
                return new Promise ((resolve, reject) => {
                    return request.post({
                        url:'https://fcm.googleapis.com/fcm/send',
                        headers : { 'Content-Type' : 'application/json', 'Authorization' : 'key=AAAAeWm0fFc:APA91bF4PZtMFUQx9Hcvw6CCBtrCxjy8tL6ND6ziBHotiNwdl2-4kA6nY7XBKef8iFPA8NqgjMvKhXFR10pmMiBDexQmy7ouyU8xjciXc1KGkz5j58rbO4nM3hD19ma9oTUVbVtlirzO' },
                        body : JSON.stringify({
                            "notification": {
                                "title": taskData.name + " need to be completed soon",
                                "body": taskData.name + " has completed by " + taskData.progress + "% so look at it once!" ,
                                "click_action": "https://basava-consultants.netlify.app/",
                                "icon": "https://i.imgur.com/5zO5cce.png"
                            },
                            "to": notificationToken
                        })
                    }, function(err,httpResponse,body){
                        // console.log('err : ', err, 'httpResponse : ', body)
                        err ? reject(err) : resolve(body);
                    })
                })
            })

            Promise.allSettled(notificationPromises).then((data) => {
                return res.send({status : !Boolean(err)});
            }).catch((e) => {
                return res.send({status : false})
            })
        })

    })
}

const deleteUsers = () => {}

module.exports = { listTasks, getTaskById, updateTaskById, createTask, listIndividualTasks, notify }