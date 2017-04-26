const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here
class Sessions extends Model {
  constructor() {
    super('sessions');
  }

  setUserId(hash, user_id) {       //eslint-disable-line camelcase
    super.update.call(this, { hash }, { user_id }); //eslint-disable-line camelcase
  }
}

module.exports = new Sessions();
