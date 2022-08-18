'use strict'

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

server.append('Show', siteMarketingCheck.checkMarketing, function (req, res, next) {
    // res.setStatusCode(404);
    // res.render('error/notFound');
    next();
});

module.exports = server.exports();