'use strict';

/**
 * @namespace Login
 */

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

/**
 * Login-Show : The Login-Show endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('Show', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
})

/**
 * Login-OAuthLogin : The Login-OAuthLogin endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Login-OAuthLogin
 * @function
 * @memberof Login
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('OAuthLogin', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
})

module.exports = server.exports();
