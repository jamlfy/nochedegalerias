const TIME = 'week';
const URI = 'https://..';
const NAME = 'Bla..';

var http = require("http");
var t = 0,
	IS = moment().startOf(TIME),
	FS = moment().endOf(TIME),
	runs = {
	now : function () {
		return URI + NAME + '/get?public=true&start[$gte]=' + IS.toJSON() + '&start[$lte]=' + FS.toJSON();
	},
	past : function () {
		return URI + NAME + '/get?public=true&end[$lte]=' + FS.toJSON() + '&start[$gte]=' + IS.toJSON();
	},
	future : function () {
		return URI + NAME + '/get?public=true&start[$gte]=' + FS.toJSON();
	},
	id : function (id) {
		return URI + NAME + '/' + id;
	}
};

exports.getList = function (is) {
	var url;
	if(is && runs[is])
		url = runs[is]();

	return http.getJSON(url);
};

exports.getEvent = function (id) {
	return http.getJSON(runs.id(id));
};