const Twig = require('twig');
const fs = require('fs');
const moment = require('moment');

//Configuration de Twig
Twig.extendFunction('last_bundle', function() {
    var stats = fs.statSync('./public/dist/bundle.js');
    var mtime = stats.mtime;
    var date = Date.parse(mtime);
    return date;
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