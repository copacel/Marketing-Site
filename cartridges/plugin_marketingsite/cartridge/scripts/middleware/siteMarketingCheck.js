'use strict';

var csrfProtection = require('dw/web/CSRFProtection');
var CustomerMgr = require('dw/customer/CustomerMgr');
var URLUtils = require('dw/web/URLUtils');
var sitePreferences = require('*/cartridge/scripts/helpers/sitePreferences');

function getRedirectUrlForAccessDenied() {
    return URLUtils.url('Home-ErrorAccessDenied').toString();
}

/**
 * Middleware validating if site marketing preference is enabled
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */

function checkMarketingSiteStatus(req, res, next) {
    if (sitePreferences.isMarketingSiteEnabled() === true) {
        if (req.httpMethod !== 'GET') {
            res.json({
                accesDenied: true,
                cartError: true,
                error: true,
                fieldErrors: [],
                serverErrors: [],
                success: true,
                redirectUrl: getRedirectUrlForAccessDenied()
            });
        } else {
            res.redirect(getRedirectUrlForAccessDenied());
            return next();
        }
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

function checkLogin(req, res, next) {
    if (sitePreferences.isCustomerLoginEnabled() !== true) {
        CustomerMgr.logoutCustomer(false);
        if (req.httpMethod !== 'GET') {
            res.json({
                accesDenied: true,
                error: true,
                fieldErrors: [],
                serverErrors: [],
                success: true,
                redirectUrl: getRedirectUrlForAccessDenied()
            });
        } else {
            res.redirect(getRedirectUrlForAccessDenied());
            return next();
        }
    }
    next();
}


module.exports = {
    checkMarketingSiteStatus: checkMarketingSiteStatus,
    checkLogin: checkLogin,
    getRedirectUrlForAccessDenied: getRedirectUrlForAccessDenied
};