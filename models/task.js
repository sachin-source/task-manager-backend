
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const oAuthTypes = ['google'];

/**
 * Task schema :
 * Taskid, name, description, assignee, assigner, priority, status, createdAt, updatedAt
 */

const taskSchema = new Schema({
  name: { type: String, default: '', required : true, trim : true },
  description: { type: String, default: '', trim : true },
  assignee: { type: String, default: '', required : true, trim : true },
  assigner: { type: String, default: '', required : true, trim : true },
  priority: { type: Number, default: 99 },
  deadline: { type : Date },
  hasPriority: { type:Boolean, default: false },
  hasDeadline: { type:Boolean, default: false },
  progress: { type: Number, default: 0 },
}, { timestamps : true });

taskSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function(options, cb) {
    options.select = options.select || 'name description priority';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  create : function(options, callback) {
    const { name, description, assignee, assigner, priority, status, deadline, hasPriority, hasDeadline } = options;
    const task = new this({ name, description, assignee, assigner, priority, status, deadline, hasPriority, hasDeadline });
    return task.save((err, taskData) => {
      console.log(taskData,options, err);
      return callback(err, taskData)
    })
  },

  update : function(options, callback) {
    const { name, description, assignee, assigner, priority, deadline, hasDeadline, status, taskId } = options;
    this.updateOne( { _id : taskId }, { name, description, assignee, assigner, priority, deadline, hasDeadline, status }, (err, taskData) => {
      console.log(err, taskData);
      return callback(err, taskData)
    })
  },

  delete : function(options, callback) {
    console.log('not setup delete method yet')
  }
};

module.exports = mongoose.model('task', taskSchema);