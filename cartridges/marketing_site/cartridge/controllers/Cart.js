'use strict'

/**
 * @namespace Cart
 */

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

/**
 * Cart-Show : The Cart-Show endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Cart-Show
 * @function
 * @memberof Cart
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('Show', siteMarketingCheck.checkMarketingSiteStatus, function (req, res, next) {
    next();
});

module.exports = server.exports();