exports.setEvent = function (data) {
	$.data = data;

	$.markdownviewer.setPageFromText(md);
};