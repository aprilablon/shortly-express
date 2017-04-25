const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here
class Sessions extends Model {
  constructor() {
    super('sessions');
  }

  create(userId) {
    const hash = utils.makeHash(Date.now());
    super.create.call(this, {user_id: userId, hash}); //eslint-disable-line camelcase
    return;
  }
}

module.exports = new Sessions();
