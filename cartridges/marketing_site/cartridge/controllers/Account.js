'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
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

module.exports = server.exports();
