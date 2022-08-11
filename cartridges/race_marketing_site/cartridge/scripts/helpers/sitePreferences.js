var System = require('dw/system');

function isMarketingSiteEnabled() {
    var site = System.Site.getCurrent();
    return site.getCustomPreferenceValue('marketingSiteEnabled') ? true : false;
}

module.exports = {
    isMarketingSiteEnabled: isMarketingSiteEnabled
}