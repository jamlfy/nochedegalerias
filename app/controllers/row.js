var moment = require('alloy/moment');
require('alloy/moment/lang/es');
moment.lang(Alloy.CFG.LANG);
var args = arguments[0] || {};
console.log('row', args);

$.row.ext = args;

$.date.text = moment(args.start).format(Alloy.CFG.FORMAT1);
$.times.text = moment(args.start).format(Alloy.CFG.FORMAT2);
$.local.text = args.location;
$.title.text = args.title;