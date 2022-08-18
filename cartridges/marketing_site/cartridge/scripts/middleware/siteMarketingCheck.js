'use strict';

var csrfProtection = require('dw/web/CSRFProtection');
var CustomerMgr = require('dw/customer/CustomerMgr');
var URLUtils = require('dw/web/URLUtils');
var sitePreferences = require('*/cartridge/scripts/helpers/sitePreferences');

/**
 * Middleware validating CSRF token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */

function checkMarketing(req, res, next) {
    if (sitePreferences.isMarketingSiteEnabled() === true) {
        if (req.querystring.args) {
            req.session.privacyCache.set('args', req.querystring.args);
        }
        var target = req.querystring.rurl || 1;
        res.setStatusCode(404);
        res.redirect(URLUtils.url('Home-Show', 'rurl', target));
        // res.render('error/notFound');
    }
    next();
}

/**
 * Middleware validating if user can show orders sections
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
 function validateDisplayOrders(req, res, next) {
    if (!sitePreferences.displayOrderHistory()) {
        res.redirect(URLUtils.url('Home-Show'));
    }
    next();
}

function validateDisplayOrdersAjax(req, res, next) {
    if (!sitePreferences.displayOrderHistory()) {
        res.setViewData({
            accesDenied: true
        });
    } else {
        next();
    }
}

module.exports = {
    checkMarketing: checkMarketing,
    validateDisplayOrders: validateDisplayOrders,
    validateDisplayOrdersAjax: validateDisplayOrdersAjax
};