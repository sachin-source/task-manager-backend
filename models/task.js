
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
  description: { type: String, default: '', required : true, trim : true },
  assignee: { type: String, default: '', required : true, trim : true },
  assigner: { type: String, default: '', required : true, trim : true },
  priority: { type: Number, default: 99 },
  status: { type: String, default: '', required : true, trim : true },
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
  }
};

mongoose.model('task', taskSchema);