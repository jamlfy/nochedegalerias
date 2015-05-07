var Admob = require('ti.admob-master');
var moment = require('alloy/moment');
require('alloy/moment/lang/es');

moment.lang(Alloy.CFG.LANG);

var adMobView = Admob.createAdMobView({
	publisherId : Alloy.CFG.publisherId,
	testing : false, // default is false
	top : 0, //optional
});

function geo () {
	if( Ti.Platform.osname == 'android' ){
		// you can also choose to place a point like so
		var latitude = 0; // set this
		var longitude = 0; // set this
		var address = ''; // set this
		var intent = Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data:'geo:'+ latitude + "," + longitude + '?q='+ $.titles.text
		});
		Ti.Android.currentActivity.startActivity(intent);
	} else {
		Ti.Platform.openURL("http://maps.google.com/maps?saddr=39.9034,116.3702&daddr=39.9344,116.4123");
	}
}

function share () {
	clock.share({
		status : $.win.title + ' ' + $.titles.text + Alloy.CFG.URLDOWNLOAD,
		androidDialogTitle : 'Comparte la exposiocion',
		animated: true
	});
}
$.win.add(adMobView);
exports.setEvent = function (data) {
	$.texts.setPageFromText(data.descrip);
	$.date.text = moment(data.start).format(Alloy.CFG.FORMAT1);
	$.times.text = moment(data.start).format(Alloy.CFG.FORMAT2);
	$.titles.text = data.location;
	$.win.title = data.title;
};