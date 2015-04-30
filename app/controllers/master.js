var cal = require('cal');

// open detail window
function openDetail(e) {
	$.trigger('detail', e);
}

// Refresh table data from remote RSS feed
function refreshCal(id) {
	var id = id || 'now';
	cal.load(id, function (err, data) {
		var rows = [];
		_.each(data, function(item) {
			rows.push(Alloy.createController('row', item).getView());
		});
		$.table.setData(rows);
	});
}

// do initial load of RSS
refreshCal();