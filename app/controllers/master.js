var cal = require('cal');

// open detail window
function openDetail(e) {
	$.trigger('detail', e);
}

// Refresh table data from remote RSS feed
function refreshCal(id) {
	console.log(id);
	var id = id || 'past';
	cal.load(id, function (err, data) {
		console.log('list', data);
		var rows = [];
		_.each(data, function(item) {
			rows.push(Alloy.createController('row', item).getView());
		});
		$.table.setData(rows);
	});
}

if( Ti.Platform.osname != 'android' && $.menus ){
	function openDialog () {
		$.menus.show();
		$.menus.addEventListener('click', refreshCal );
	}

}

// do initial load of RSS
refreshCal();