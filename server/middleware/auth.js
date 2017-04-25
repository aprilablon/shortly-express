const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils');

module.exports.createSession = (req, res, next) => {
  const hash = utils.makeHash( Math.random().toString() );
  req.session = req.session || {};
  Object.assign(req.session, { hash });

  res.cookies = {
    shortlyid: { value: hash }
  };

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
// module.exports.sessionParser = (req, res, next) => {
//   if (!req.cookies) {
//     const sessionInfo = module.exports.createSession();
//     req.session = sessionInfo;
//   } else {
//     syncSession()
//   }
//   next();
// }
//
// syncSession =
