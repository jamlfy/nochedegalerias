var args = arguments[0] || {};

$.row.ext = args;

$.date.text = Alloy.Globals.moment(args.start).format(Alloy.CFG.FORMAT1);
$.times.text = Alloy.Globals.moment(args.start).format(Alloy.CFG.FORMAT2);
$.local.text = args.location;
$.title.text = args.title;