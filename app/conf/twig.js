const conf = require('./conf');
const Twig = require('twig');
const fs = require('fs');
const moment = require('moment');

//Configuration de Twig
Twig.extendFunction('get_js_bundle', function() {
    const key = 'main.js';
    if (conf.ENV == 'dev') {
        return key;
    } else {
        const manifest = require(conf.PATH_DIST + 'manifest.json');
        return manifest[key];
    }
});

Twig.extendFunction('get_css_bundle', function() {
    const key = 'main.css';
    if (conf.ENV == 'dev') {
        return key;
    } else {
        const manifest = require(conf.PATH_DIST + 'manifest.json');
        return manifest[key];
    }
});

Twig.extendFilter('timestampToDate', function (value) {
    var dateString = moment.unix(value).format("MM/DD/YYYY");
    return dateString;
});

Twig.extendFilter('resume', function(value, params) {
    var strReduce = value.substr(0,150);
    let lastSpace = strReduce.lastIndexOf(' ');
    strReduce.substr(0,lastSpace);
    return `${strReduce}...`;
});

Twig.extendFilter('slug', function(value,params) {
    var slug = value.toLowerCase();
    slug = slug.split(' ');
    slug = slug.join('-');
    return slug;
});

module.exports = Twig;