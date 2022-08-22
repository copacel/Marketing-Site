'use strict';

var csrfProtection = require('dw/web/CSRFProtection');
var CustomerMgr = require('dw/customer/CustomerMgr');
var URLUtils = require('dw/web/URLUtils');
var sitePreferences = require('*/cartridge/scripts/helpers/sitePreferences');

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
                redirectUrl: URLUtils.url('Home-Show').toString()
            });
        } else {
            res.redirect(URLUtils.url('Home-Show'));
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
 function validateDisplayOrders(req, res, next) {
    if (!sitePreferences.displayOrderHistory()) {
        res.redirect(URLUtils.url('Home-Show'));
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
function validateDisplayOrdersAjax(req, res, next) {
    if (!sitePreferences.displayOrderHistory()) {
        res.setViewData({
            accesDenied: true
        });
    } else {
        next();
    }
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
                success: true,
                cartError: true,
                redirectUrl: URLUtils.url('Home-Show').toString()
            });
        } else {
            res.redirect(URLUtils.url('Home-Show'));
            return next();
        }
    }
    next();
}


module.exports = {
    checkMarketingSiteStatus: checkMarketingSiteStatus,
    validateDisplayOrders: validateDisplayOrders,
    validateDisplayOrdersAjax: validateDisplayOrdersAjax,
    checkLogin: checkLogin
};