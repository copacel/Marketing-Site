'use strict';

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

server.append('Show', siteMarketingCheck.checkLogin, function (req, res, next) {
    var sitePreferencesHelper = require('*/cartridge/scripts/helpers/sitePreferences');

    var viewData = res.getViewData();
    var account = viewData.account;
    var displayOrderHistory = sitePreferencesHelper.displayOrderHistory();

    if (!displayOrderHistory) {
        account.orderHistory = false;
    }

    res.setViewData({
        account: account
    });
    next();
});

server.append('EditProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.append('EditPassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.append('SaveProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.append('SavePassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

module.exports = server.exports();
