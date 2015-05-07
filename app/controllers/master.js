var cal = require('cal');
var Admob = require('ti.admob');

var adMobView = Admob.createAdMobView({
	publisherId : Alloy.CFG.publisherId,
	testing : false, // default is false
	top : 0, //optional
});

// open detail window
function openDetail(e) {
	$.trigger('detail', e);
}

function refreshCal(id) {
	console.log(id);
	var id = id || 'past';
	cal.load(id, function (err, data) {
		console.log('list', data.length);
		var rows = [];
		_.each(data, function(item) {
			rows.push(Alloy.createController('row', item).getView());
		});
		$.activityIndicator.hide();
		$.table.setData(rows);
	});
}

if( Ti.Platform.osname != 'android' && $.menus ){
	function openDialog () {
		$.menus.show();
	}
	$.menus.addEventListener('click', refreshCal );
}

refreshCal();

$.mast.add(adMobView);
$.activityIndicator.show();