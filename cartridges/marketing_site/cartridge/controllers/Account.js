'use strict';

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

// must be append for displayHistory to work well
server.append('Show', siteMarketingCheck.checkLogin, function (req, res, next) {
    var sitePreferencesHelper = require('*/cartridge/scripts/helpers/sitePreferences');

    var viewData = res.getViewData();
    var account = viewData.account;
    var displayOrderHistory = sitePreferencesHelper.displayOrderHistory();

    if (!displayOrderHistory && account) {
        account.orderHistory = false;
    }

    res.setViewData({
        account: account
    });
    next();
});

server.prepend('EditProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.prepend('EditPassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

server.prepend('SaveProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

server.prepend('SavePassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

server.prepend('Login', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

module.exports = server.exports();
