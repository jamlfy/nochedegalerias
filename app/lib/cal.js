var moment = require('alloy/moment');
var t = 0,
	now = moment(),
	runs = {
	now : function () {
		return URI + NAME + '?start=' + id
	},
	past : function () {
		return URI + NAME + '?start=' + id
	},
	future : function () {
		return URI + NAME + '?start=' + id
	},
	id : function (id) {
		return URI + NAME + '/' + id
	}
};

exports.load = function(name, callback) {
	var xhr = Titanium.Network.createHTTPClient(),
		got =  runs[name] || runs.id ;

	xhr.open('GET', got(name));
	xhr.onload = function(e) {
		var xml = this.responseText;

		if (!xml) {
			if( t > 3)
				return callback(new Error('No Exist data'));

			t++;
			return exports.load(name, callback);
		}

		try{
			var jzon = JSON.parse(xml), error;
			if(jzon.error)
				error = new Error(jzon.error);

			callback(error, jzon.events);
		}catch(e){
			callback(e);
		}
	};

	xhr.onerror = callback;
	xhr.send();
};