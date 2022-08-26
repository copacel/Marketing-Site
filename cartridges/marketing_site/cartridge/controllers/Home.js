'use strict';

/**
 * @namespace Home
 */

var server = require('server');
server.extend(module.superModule);


server.get('ErrorAccessDenied', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/accessDenied');
    next();
});

module.exports = server.exports();
