const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

// const makeSalt = () => {
//   const hash = crypto.createHash('sha256');
//   hash.update(Date.now().toString());
//   return hash.digest('hex');
// }

const makeHash = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

module.exports.makeHash = makeHash;
