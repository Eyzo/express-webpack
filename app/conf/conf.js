const path = require('path');

const ENV = 'dev';
const PATH_SITE = path.resolve(__dirname + '../../../');
const PATH_DIST = PATH_SITE + '/public/dist/';

module.exports = { ENV,PATH_SITE,PATH_DIST };

