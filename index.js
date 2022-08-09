const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("working")
})

const authenticate = (req, res, next) => {
    /**
     * JWT based authentication logic for all the routes
     */
}

/**
 * Main tasks to be done
 * Signin logic with token
 * Authentication - JWT
 */

/**
 * Features for now
 * Assign task by mentioning
 * List all assigned tasks
 * List by priority, createdAt, updatedAt
 * Filter tasks by status : pending, in progress, completed, re-opened etc
 * Status will have particular colors so that we can easyly identify
 * The time at which particular task's status changed need to be stored.
 */

/**
 * Features for future :
 * Comment section for tasks
 * Sub tasks for main tasks
 * Deadline for tasks
 * Deadline based listing of tasks
 * Reminder notifications for tasks ( Like alarm )
 */

/**
 * Task schema :
 * Taskid, name, discription, assignee, assigner, priority, status, createdAt, updatedAt
 */

/**
 * Task status schema :
 * Status, color
 */

/**
 * Task transaction schema :
 * Taskid, assigner, assignee, statusChanger, previousStatus, currentStatus, timeOfStatusChange
 */

/**
 * User schema :
 * email, password, name
 */

/**
 * List all tasks by id
 */


// app.get('/login', (req, res) => {
//     const { email, password } = req.query;
//     // Sign in with email/name and encrypted, hashed password
//     db.collection('users').findOne({ email or name and passowrd }, (err, user) => {
//     if(err) {
        
//     } else if (!user && !err) {

//     } else if (!err && user) {

// token generation logic and sending the token to client

//     }
// })

// })



const listTasks = (req, res) => {
    db.collection('task-management').find({}, (err, tasks) => {
        res.send(tasks)
    })
};

const getTaskById = (req, res) => {
    const { taskid } = req.params.taskid;
    db.collection('task-management').find({ _id : taskid }, (err, task) => {
        res.send(task)
    })
};

const updateTaskById = (req, res) => {
    const { taskid } = req.params.taskid;
    const { name, discription, assignee, assigner, priority, status } = req.body;
    db.collection('task-management').upadteOne({ _id : taskid }, { name, discription, assignee, assigner, priority, status, updatedAt : Date.now() }, (err, task) => {
        res.send(task)
    })
};

const createTaskById = (req, res) => {
    const { taskid } = req.params.taskid;
    const { name, discription, assignee, assigner, priority, status } = req.body;
    db.collection('task-management').insertOne({ name, discription, assignee, assigner, priority, status, createdAt : Date.now(), updatedAt : Date.now() }, (err, created) => {
        res.send(created)
    })
};



/**
 * Get particular task id
 * Create task - POST
 * Update task - PUT
 * Delete task - DELETE
 */
app.get('/task', listTasks);
app.get('/task:taskid', getTaskById);
app.post('/task:taskid', createTaskById);
app.put('/task:taskid', updateTaskById);
app.delete('/task:taskid', deleteTaskById);

app.listen(3000, () => {
    console.log("app is listening")
})