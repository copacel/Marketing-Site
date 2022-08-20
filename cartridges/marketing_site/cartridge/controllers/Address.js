'use strict';

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

server.append('List', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.append('EditAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.append('AddAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

module.exports = server.exports();
