# SFCC Marketing Site Plugin

## Summary

The following cartridge aims to allow merchants to enable or disable certain transactional functionalities depending on their needs.

## Implementation guide

### Cartridge installation

a)	Import metadata:
-	In the cartridge folder find \metadata\site-import\meta\marketingSitePreferences.xml
-	Go to Business Manager > Administration > Site Development > Import & Export
-	Under Import & Export Files, click Upload and select the .xml file in the metadata folder
-	Under Meta Data, 	click Import and select the file that you have just uploaded
-	This should create a new group containing multiple site preference attributes. To check whether the import was successful, go to Business Manager > Merchant Tools > Site Preferences > Custom Preferences. Search for Marketing Site group. Clicking it should return your attributes.

b)	Update the cartridge path:
-	Go to Business Manager > Administration > Sites > Manage Sites
-	Select the site you wish
-	Click on the Settings tab
-	Prepend “plugin_marketingsite:” in the cartridge path (without quotes)
-	Click Apply

### Custom attributes

The following table contains the 5 attributes used to manipulate the site preferences in regards of transactional features.

|#|Attribute Name|Data Type|
|---|---|---|
|1|enableMarketingSite|boolean|
|2|enableCustomerLogin|boolean|
|3|enableProductAvailability|boolean|
|4|enableProductPrice|boolean|
|5|enableProductVariations|boolean|

### Brief description of attributes

**enableMarketingSite** - Disable transactional features such as Add to Cart, Cart, Checkout, Payment, Order History.

**enableCustomerLogin** - If this setting is disabled, customers can no longer register or log in to the site. If the Marketing Site is disabled and this setting is disabled, they can place an order as guest.

**enableProductAvailability** - Show/Hide product availability info in the PDP. This setting is useful if the marketing site is enabled and we don't want the buyer to see the product stock.

**enableProductPrice** - Show/Hide product price in the PDP.

**enableProductVariations** - Show/Hide product variations, like color, size. This config must be enabled if enableMarketingSite is set to No or enableProductPrice is set to Yes.

## Dependencies

None at the moment.
## Other considerations

The attributes allow flexibility, meaning you can enable and disable them independently. As such, **if _enableMarketingSite_ is disabled, then _enableCustomerLogin_ will have to be enabled** as they are not interdependent.