const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/index');

const routes = require('./routers/index.router')
app.use(cors())



// Bootstrap models
// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^.].*\.js$/))
//   .forEach(file => require(join(models, file)));


function listen() {
  app.listen(3005);
  console.log('Express app started on port ' + 3000);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(config.db, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());


app.use('/', routes);
app.get('*', (req, res) => {
  res.send("working")
})



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










/**
 * Good resources : https://github.com/madhums/node-express-mongoose-demo/
 */
connect();