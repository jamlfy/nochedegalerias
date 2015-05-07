var t = 0,
	now = Alloy.Globals.moment(),
	runs = {
	now : function () {
		var IS = now.startOf(Alloy.CFG.TIME),
			FS = now.endOf(Alloy.CFG.TIME);
		return Alloy.CFG.URI + Alloy.CFG.NAME + '/get?start[$gte]=' + IS.toJSON() + '&start[$lte]=' + FS.toJSON();
	},
	past : function () {
		var IS = now.startOf(Alloy.CFG.TIME),
			FS = now.endOf(Alloy.CFG.TIME);

		return Alloy.CFG.URI + Alloy.CFG.NAME + '/get?end[$lte]=' + FS.toJSON(); //+ '&start[$lte]=' + IS.toJSON();
	},
	future : function () {
		var FS = now.endOf(Alloy.CFG.TIME);
		return Alloy.CFG.URI + Alloy.CFG.NAME + '/get?start[$gte]=' + FS.toJSON();
	},
	id : function (id) {
		return Alloy.CFG.URI + Alloy.CFG.NAME + '/' + id;
	}
};
exports.listAct = [ 'past', 'now', 'future' ];

exports.load = function(name, callback) {
	var xhr = Titanium.Network.createHTTPClient(),
		got =  runs[name] || runs.id ;

	xhr.open('GET', got(name));
	xhr.setRequestHeader('X-Titanium-ID', Titanium.userAgent + ' '+ Ti.getVersion());
	
	xhr.onload = function(e) {
		var xml = this.responseText;

		if (!xml) {
			if( t > 3)
				return callback(new Error('No Exist data'), []);

			t++;
			return exports.load(name, callback);
		}

		try{
			var jzon = JSON.parse(xml), error;
			if(jzon.error)
				error = new Error(jzon.error);

			callback(error, jzon.events || []);
		}catch(e){
			callback(e);
		}
	};

	xhr.onerror = callback;
	xhr.send();
};