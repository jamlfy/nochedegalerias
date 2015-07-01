GLOBAL.moment = require("../node_modules/moment");
GLOBAL._ = require("../node_modules/underscore");

var application = require("application");
var appSettings = require("application-settings");

var stringValue = appSettings.getString("types");
if(!stringValue)
	appSettings.setString("types", "now");

application.mainModule = "main-page";
application.cssFile = "./app.css";
application.start();
