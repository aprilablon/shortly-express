const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here
class Users extends Model {
  constructor() {
    super('users');
  }

  create({ username, password }) {
    const hash = utils.makeHash(password);
    super.create.call(this, {username, password: hash});
    return;
  }
}

module.exports = new Users();

// {username: april,  password: 123}
