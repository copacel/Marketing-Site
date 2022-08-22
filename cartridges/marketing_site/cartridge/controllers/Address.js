'use strict';

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

server.prepend('List', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.prepend('EditAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.prepend('AddAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.prepend('SaveAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

module.exports = server.exports();
