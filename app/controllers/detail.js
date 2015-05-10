var Social = require('com.alcoapps.socialshare');
var Admob = require('ti.admob');
var code = Admob.isGooglePlayServicesAvailable(),
	adMobView;

if (code == Admob.SUCCESS)
	adMobView = Admob.createView(Alloy.CFG.ADMOB);

function geo () {
	if( Ti.Platform.osname == 'android' ){
		var la = 0; // set this
		var intent = Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data:'geo:'+ la + ',' + la + '?q=bogota,'+ $.titles.text
		});
		Ti.Android.currentActivity.startActivity(intent);
	} else {
		Ti.Platform.openURL('http://maps.google.com/maps?saddr=39.9034,116.3702&daddr=39.9344,116.4123');
	}
}

function share () {
	Social.share({
		status :String.format( L('textshare'), $.win.title, $.titles.text ),
		androidDialogTitle : L('share')
	});
}

exports.setEvent = function (data) {
	$.texts.setPageFromText(data.descrip);
	$.date.text = Alloy.Globals.moment(data.start).format(Alloy.CFG.FORMAT1);
	$.times.text = Alloy.Globals.moment(data.start).format(Alloy.CFG.FORMAT2);
	$.titles.text = data.location;
	$.win.title = data.title;
	if (code == Admob.SUCCESS && !data.promo) {
		$.win.add(adMobView);		
	}
};