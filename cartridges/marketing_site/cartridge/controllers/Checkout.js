'use strict'

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

server.prepend('Begin', siteMarketingCheck.checkMarketingSiteStatus, function (req, res, next) {
    next();
});

module.exports = server.exports();