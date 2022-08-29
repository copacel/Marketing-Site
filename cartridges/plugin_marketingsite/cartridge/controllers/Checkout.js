'use strict'

/**
 * @namespace Checkout
 */

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

/**
 * Checkout-Begin : The Checkout-Begin endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Checkout-Begin
 * @function
 * @memberof Checkout
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('Begin', siteMarketingCheck.checkMarketingSiteStatus, function (req, res, next) {
    next();
});

module.exports = server.exports();