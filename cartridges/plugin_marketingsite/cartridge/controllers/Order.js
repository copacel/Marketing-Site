'use strict';

/**
 * @namespace Order
 */

var server = require('server');

server.extend(module.superModule);

var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var siteMarketingCheck = require('*/cartridge/scripts/middleware/siteMarketingCheck');
var sitePreferencesHelper = require('*/cartridge/scripts/helpers/sitePreferences');


/**
 * Order-History : This endpoint is invoked to get Order History for the logged in shopper
 * @name Base/Order-History
 * @function
 * @memberof Order
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 */
 server.prepend(
    'History',
    siteMarketingCheck.checkLogin,
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {
        next();
    }
);

/**
 * Order-Details : This endpoint is called to get Order Details
 * @name Base/Order-Details
 * @function
 * @memberof Order
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 * @param {serverfunction} - get
 */
server.prepend(
    'Details',
    siteMarketingCheck.checkLogin,
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {
        next();
    }
);

/**
 * Order-Filtered : This endpoint filters the Orders shown on the Order History Page
 * @name Base/Order-Filtered
 * @function
 * @memberof Order
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 * @param {querystringparameter} - orderFilter - Order Filter ID
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.prepend(
    'Filtered',
    siteMarketingCheck.checkLogin,
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {

        var data = res.getViewData();
        if (data && data.accesDenied) {
            res.json({
                error: true,
                serverErrors: []
            });
            return;
        }
        next();
    }
);

/**
 * Order-Track : This endpoint is used to track a placed Order
 * @name Base/Order-Track
 * @function
 * @memberof Order
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - post
 */
server.prepend(
    'Track',
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {

        var data = res.getViewData();
        if (data && data.accesDenied) {
            res.json({
                error: true,
                serverErrors: []
            });
            res.redirect(siteMarketingCheck.getRedirectUrlForAccessDenied());
            next();
        }
        next();
    }
);

module.exports = server.exports();
