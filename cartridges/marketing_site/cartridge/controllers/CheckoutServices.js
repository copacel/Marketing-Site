'use strict';

/**
 * @namespace CheckoutServices
 */

var server = require('server');
server.extend(module.superModule);

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var siteMarketingCheck = require('*/cartridge/scripts/middleware/siteMarketingCheck');
var URLUtils = require('dw/web/URLUtils');


/**
 *  Handle Ajax payment (and billing) form submit
 */
/**
 * CheckoutServices-SubmitPayment : The CheckoutServices-SubmitPayment endpoint will submit the payment information and render the checkout place order page allowing the shopper to confirm and place the order
 * @name Base/CheckoutServices-SubmitPayment
 * @function
 * @memberof CheckoutServices
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.prepend(
    'SubmitPayment',
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {
        var data = res.getViewData();
        if (data && data.accesDenied) {
            this.emit('route:Complete', req, res);
            return;
        }
        next();
    }
);

/**
 * CheckoutServices-PlaceOrder : The CheckoutServices-PlaceOrder endpoint places the order
 * @name Base/CheckoutServices-PlaceOrder
 * @function
 * @memberof CheckoutServices
 * @param {middleware} - siteMarketingCheck.checkMarketingSiteStatus
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.prepend('PlaceOrder', siteMarketingCheck.checkMarketingSiteStatus, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});


/**
 * Handle Ajax registered customer form submit.
 */
server.prepend('LoginCustomer', siteMarketingCheck.checkLogin, function (req, res, next) {
    var data = res.getViewData();
    if (data && data.accesDenied) {
        this.emit('route:Complete', req, res);
        return;
    }
    next();
});

/**
 * Handle Ajax guest customer form submit.
 */
server.prepend(
    'SubmitCustomer',
    siteMarketingCheck.checkMarketingSiteStatus,
    function (req, res, next) {
        var data = res.getViewData();
        if (data && data.accesDenied) {
            this.emit('route:Complete', req, res);
            return;
        }
        next();
    }
);

module.exports = server.exports();
