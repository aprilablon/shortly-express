const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils');

module.exports.createSession = (req, res, next) => {
  // debugger;
  const user_agent = req.headers['user-agent']; //eslint-disable-line camelcase
  const hash = req.cookies ? req.cookies.shortlyid : null;

  const createNewSession = () => {
    const hash = utils.makeHash( Math.random().toString() );
    models.Sessions.create({ hash, user_agent }); //eslint-disable-line camelcase
    res.cookies = { shortlyid: { value: hash } };
    res.cookie('shortlyid', hash);
    req.session = { hash };
  };

  Promise.resolve(req.cookies)
    .tap(cookies => {
      if (!cookies) { throw 'no cookies!'; }
    })
    .then(cookies => {
      return models.Sessions.get({ hash });
    })
    .tap(rows => {
      if (!rows) { throw 'not in session db'; }
    })
    .tap(row => {
      if (row.user_agent !== user_agent) {      //eslint-disable-line camelcase
        models.Sessions.delete({ hash });
        throw 'user agent does not match';
      }
    })
    .then((row) => {
      // add user id in here
      user_id = row.user_id;   //eslint-disable-line camelcase
      req.session = Object.assign({}, req.session, { hash, user_id });  //eslint-disable-line camelcase
    })
    .catch(err => {
      createNewSession();
    })
    .then(() => {
      next();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.authentication = (req, res, next) => {
  // console.log(req.session);
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  next();
};
