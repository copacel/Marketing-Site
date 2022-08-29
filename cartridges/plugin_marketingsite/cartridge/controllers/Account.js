'use strict';

/**
 * @namespace Account
 */

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');

server.extend(module.superModule);

// must be append for displayHistory to work well
/**
 * Account-Show : The Account-Show endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-Show
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.append('Show', siteMarketingCheck.checkLogin, function (req, res, next) {
    var sitePreferencesHelper = require('*/cartridge/scripts/helpers/sitePreferences');

    var viewData = res.getViewData();
    var account = viewData.account;
    var isMarketingSiteEnabled = sitePreferencesHelper.isMarketingSiteEnabled();

    if (isMarketingSiteEnabled && account) {
        account.orderHistory = false;
    }

    res.setViewData({
        account: account
    });
    next();
});

/**
 * Account-EditProfile : The Account-EditProfile endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-EditProfile
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('EditProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

/**
 * Account-EditPassword : The Account-EditPassword endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-EditPassword
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('EditPassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

/**
 * Account-SaveProfile : The Account-SaveProfile endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-SaveProfile
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - post
 */
server.prepend('SaveProfile', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

/**
 * Account-SavePassword : The Account-SavePassword endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-SavePassword
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - post
 */
server.prepend('SavePassword', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

/**
 * Account-Login : The Account-Login endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Account-Login
 * @function
 * @memberof Account
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - post
 */
server.prepend('Login', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

module.exports = server.exports();
