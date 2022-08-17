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



/**
 * Order-Details : This endpoint is called to get Order Details
 * @name Base/Order-Details
 * @function
 * @memberof Order
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {serverfunction} - get
 */
server.prepend(
    'Details',
    consentTracking.consent,
    server.middleware.https,
    userLoggedIn.validateLoggedIn,
    function (req, res, next) {

        // if (true) {

        // } else {
        //     res.redirect(URLUtils.url('Account-Show'));
        // }
        next();
    }
);

module.exports = server.exports();
