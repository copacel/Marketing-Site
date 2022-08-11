var System = require('dw/system');

function getSitePreferences() {
    var prefs = {};
    var site = System.Site.getCurrent();
    prefs.marketingSiteEnabled = site.getCustomPreferenceValue('marketingSiteEnabled') ? true : false;

    return prefs;
}

module.exports = {
    getSitePreferences: getSitePreferences
}