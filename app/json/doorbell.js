var http = require("http");
var dialogs = require("ui/dialogs");
const URI = 'https://:host/api/applications/:id/:action?key=:api';

/**
 *
 * Example:
 * var door = require('door');
 * var doorbell = new door.bell(124, 'mykey', 'feed.myDomain.com');
 * doorbell.setEmail('Myuser@mydomain.com');
 * doorbell.submit({
 * 	  id : 'bla'
 * }, function(data){
 *  console(data);
 * }, function(err){
 * 	console.log(err);
 * });
 * 
 */

/**
 * Connect api with doorbbell
 * @param  string|number 	id   Id the app in doorbell
 * @param  string 			key  Key the app in doorbell
 * @param  string 			host The host is upgrade
 * @param  object 			opts Options form the Dialog
 * @return object      		The instace
 */
function doorbell (id, key, host, opts) {
	this.id = id || 1;
	this.key = key || 'MyKey';
	this.host = host || 'doorbell.io';
	this.setBasic(opts);
	var that = this;

	this.open = function (data, succes, error) {
		dialogs.prompt(that.opts).then(function (result) {
			that.__createSend('open', 'GET', data).then(that.__response(succes), error);
		});
	};

	/**
	 * Submit data
	 * @param  {object|null} 	data   The data to send
	 * @param  {function} 		succes Function for de results
	 * @param  {function} 		error  Function for de results
	 */
	this.submit = function (data, succes, error) {
		var dt = {};
		if(that.email) dt.email = that.email;
		dialogs.prompt(that.opts).then(function (result) {
			dt.message = result.message;
			if(data) dt.properties = data;
			that.__createSend('submit', 'POST', data).then(that.__response(succes), error);
		});
	};

	return this;
}

/**
 * Set the options for the dialog
 * @param Object opt 
 */
doorbell.prototype.setBasic = function(opt) {
	this.opts = opt || {};
	this.opts.title = this.opts.title || 'Feedback';
	this.opts.message = this.opts.message || '';
	this.opts.okButtonText = this.opts.okButtonText || 'Send';
	this.opts.cancelButtonText = this.opts.cancelButtonText || 'Cancel';
	return this;
};

/**
 * Set a email form the user
 * @param string email 
 */
doorbell.prototype.setEmail = function(email) {
	this.email = email;
	return this;
};

/**
 * Create a send is a function to send the data 
 * @param  String 	is     Is the paramert form https://doorbell.io/docs/api
 * @param  String 	method Is the method with send
 * @param  Object	data   Is the data with send
 * @return Object 			A promise
 */
doorbell.prototype.__createSend = function (is, method, data) {
	var send = {
		url: URI
			.replace(':host', this.host)
			.replace(':id', this.id)
			.replace(':api', this.key)
			.replace(':action', is),
		method: method
	};
	if(data && method === 'POST'){
		send.headers = { "Content-Type": "application/json" };
		send.content = JSON.stringify(data);
	}else {
		if(data){
			for (var i in data) 
				send.url += '&' + i + '=' + data[i];
		}
	}

	return http.request(send);
};

/**
 * Responce
 * @param  {Function} callback Succes
 * @return {Function}          The funcion to proccess the respnce form doorbell
 */
doorbell.prototype.__response = function(callback) {
	return function (response) {
		console.log(response);
		callback();
	};
};

exports.bell = doorbell;
