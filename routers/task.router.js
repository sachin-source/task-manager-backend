const express = require('express');
const router = express.Router();

const taskController = require("../controllers/task.controller")

router.route('/').get(taskController.listTasks);
router.route('/new').post(taskController.createTask);

router.route('/individual').get(taskController.listIndividualTasks);

router.route('/:taskId')
.get(taskController.getTaskById)
.put(taskController.updateTaskById);

router.route('/notify/:taskId').get(taskController.notify);
// delete task functionality is not yet implimented

module.exports = router;