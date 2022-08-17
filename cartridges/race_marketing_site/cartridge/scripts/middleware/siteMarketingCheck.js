'use strict';

var csrfProtection = require('dw/web/CSRFProtection');
var CustomerMgr = require('dw/customer/CustomerMgr');
var URLUtils = require('dw/web/URLUtils');
var sitePreferences = require('../helpers/sitePreferences');

/**
 * Middleware validating CSRF token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */

function checkMarketing(req, res, next) {
    if (sitePreferences.isMarketingSiteEnabled() === false) {
        res.setStatusCode(404);
        res.render('error/notFound');
    }
    next();
}

module.exports = {
    checkMarketing: checkMarketing
};