
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const oAuthTypes = ['github', 'twitter', 'google', 'linkedin'];

/**
 * User Schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '', trim: true, required: true },
  email: { type: String, default: '', trim: true, required: true, unique: true },
  // username: { type: String, default: '', trim : true, required : true },
  provider: { type: String, default: 'custom', trim: true },
  hashed_password: { type: String, default: '', trim: true, required: true },
  role: { type: String, default: 'user', trim: true, required: true },
  authToken: { type: String, default: '' },
  notificationToken: [{ type: String }],
  google: {},
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  }
});
/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */

  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  },

};

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },
  list: function (options, cb) {
    const { find, select = 'name email -_id' } = options;
    return this.find(find)
      .select(select)
      .exec(cb);
  },
  signUp: function (options, cb) {
    const { email, name, password } = options;
    const adminMails = ['sachinadmin@gmail.com', 'sachinmgvt@gmail.com']
    const user = new this({ email, name, password, role: adminMails.includes(email) ? 'admin' : 'user' });
    user.save((err, response) => {
      console.log(err, response)
      cb(err, response)
    })
  },
  login: function (options, cb) {
    const { email, password } = options;
    return this.findOne({ email }, (err, data) => {
      if (err || !data) {
        return cb(err, false, {})
      }else {
        
      const same = bcrypt.compareSync(password, data.hashed_password);
      return cb(err, same, data)
      }
    })
  },
};

module.exports = mongoose.model('user', UserSchema);