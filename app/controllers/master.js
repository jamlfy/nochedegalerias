const cal = require('cal');
const Admob = require('ti.admob');
var code = Admob.isGooglePlayServicesAvailable(),
	adMobView;

if (code == Admob.SUCCESS)
	$.mast.add(Admob.createView(Alloy.CFG.ADMOB));

// open detail window
function openDetail(e) {
	$.trigger('detail', e);
}

function refreshCal(e) {
	var isId = 'now';

	if(e && e.itemId)
		isId = cal.listAct[ e.itemId ];

	cal.load(isId, function (err, data) {
		if(err){
			console.error(err);
			alert(err.toString());
		} else {
			var rows = [];
			$.table.setData(rows);
			_.each(data, function(item) {
				rows.push(Alloy.createController('row', item).getView());
			});
			$.activityIndicator.hide();
			$.table.setData(rows);
		}
	});
}

if( Ti.Platform.osname != 'android' && $.menus ){
	function openDialog () {
		$.menus.show();
	}
	$.menus.addEventListener('click', refreshCal );
}

refreshCal();
$.activityIndicator.show();
