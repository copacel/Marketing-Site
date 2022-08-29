'use strict';

/**
 * @namespace Address
 */

var server = require('server');
var siteMarketingCheck = require('../scripts/middleware/siteMarketingCheck');
server.extend(module.superModule);

/**
 * Address-List : The Address-List endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Address-List
 * @function
 * @memberof Address
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('List', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

/**
 * Address-EditAddress : The Address-EditAddress endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Address-EditAddress
 * @function
 * @memberof Address
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('EditAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

/**
 * Address-AddAddress : The Address-AddAddress endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Address-AddAddress
 * @function
 * @memberof Address
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - get
 */
server.prepend('AddAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    next();
});

/**
 * Address-SaveAddress : The Address-SaveAddress endpoint will now check whether the login site preference is enabled or not before proceeding.
 * @name Base/Address-SaveAddress
 * @function
 * @memberof Address
 * @param {middleware} - siteMarketingCheck.checkLogin
 * @param {serverfunction} - post
 */
server.prepend('SaveAddress', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

module.exports = server.exports();
