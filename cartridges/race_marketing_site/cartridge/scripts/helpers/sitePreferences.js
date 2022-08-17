var System = require('dw/system');
var marketingSiteEnabledCachedValue = 0;

/**
 *
 * @returns {boolean} a boolean of true or false
 */
function isMarketingSiteEnabled() {
    if (marketingSiteEnabledCachedValue !== 0) {
        return marketingSiteEnabledCachedValue;
    }
    var site = System.Site.getCurrent();
    var isMarketingSiteEnabled = site.getCustomPreferenceValue('enableMarketingSite') ? true : false;
    marketingSiteEnabledCachedValue = isMarketingSiteEnabled;

    return isMarketingSiteEnabled;
}

/**
 * Appends site preference values to controller view data
 * @param {Object} res - the response from the controller to append values to
 */
function appendSitePreferences(res) {
    var viewData = res.getViewData();
    viewData.isMarketingSiteEnabled = isMarketingSiteEnabled();
    res.setViewData(viewData);
};

module.exports = {
    isMarketingSiteEnabled: isMarketingSiteEnabled,
    appendSitePreferences: appendSitePreferences
}