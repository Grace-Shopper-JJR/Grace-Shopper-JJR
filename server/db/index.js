const { db } = require('./database');

const chalk = require('chalk');

module.exports = {
    db,
    ...require('./users'),
    ...require('./userprefs'),
    ...require('./merch'),
    ...require('./payments'),
    ...require('./orders'),
    ...require('./blog'),
    ...require('./wishlist')
}