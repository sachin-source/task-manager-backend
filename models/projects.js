
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * projectSchema schema :
 * Taskid, project, createdAt, updatedAt
 */

const projectSchema = new Schema({
  name: { type: String, default: '', required : true, trim : true },
}, { timestamps : true });

projectSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function(find, cb) {
    return this.findOne(find)
      .exec(cb);
  },

  create : function(options, callback) {
    const { name } = options;
    const project = new this({ name });
    return project.save((err, projectData) => {
      // console.log(projectData,options, err);
      return callback(err, projectData)
    })
  },

  update : function(options, callback) {
    const { name } = options;
    this.updateOne( { _id : projectId }, { name }, (err, projectData) => {
      return callback(err, projectData)
    })
  },

  delete : function(options, callback) {
    console.log('not setup delete method yet')
  }
};

module.exports = mongoose.model('project', projectSchema);