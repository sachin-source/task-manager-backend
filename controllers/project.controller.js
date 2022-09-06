const project = require('../models/projects');
const payment = require('../models/payment');

const addProject = (req, res) => {
    const { name } = req.body;
    return project.create({ name }, (err, data) => {
        return res.send({ status : !err, data, message : err ? "error creating the project, Please try again later" : "project created successfully" })
    })
}

const listProjects = (req, res) => {
    return project.find({}, (err, projects) => {
        return res.send({ status : !err, projects, message : err ? "error listing the projects, please try again later" : "list of all the projects" })
    })
}

payment.updateMany({}, {$set : { projectId : "63176cb78d43be54ae1c1b15"}}, (err, updateFlag) => {
    console.log(err, updateFlag)
})



module.exports = { addProject, listProjects };