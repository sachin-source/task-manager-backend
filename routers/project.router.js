const { Router } = require("express");
const { addProject, listProjects } = require("../controllers/project.controller");

const router = Router();

router.route('/')
.get(listProjects)
.post(addProject);

module.exports = router;