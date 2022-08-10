const express = require('express');
const router = express.Router();

const taskController = require("../controllers/task.controller")

router.route('/').get(taskController.listTasks);
router.route('/new').post(taskController.createTask);

router.route('/:taskId')
.get(taskController.getTaskById)
.put(taskController.updateTaskById);

// delete task functionality is not yet implimented

module.exports = router;