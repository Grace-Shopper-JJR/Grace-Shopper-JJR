// require and re-export all files in this db directory (users, activities...)

// const chalk = require('chalk');

module.exports = {
    ...require('./client_db'),
    ...require('./users'),
    ...require('./userprefs'),
    ...require('./merch'),
    ...require('./payments'),
    ...require('./orders'),
    ...require('./wishlist')
  }