$(document).ready(function ready () {
	var isRetina = (window.devicePixelRatio == 2);

	if (isRetina) $('body').addClass('retina');

	var filteredIcons = function filteredIcons(icons) {
		var newIcons = [];

		$.each(icons, function(index, path) {
			if (!path.match(/\/Gray\//)) return;
			if (path.match(/@2x/)) return;
			newIcons.push(path);
		});

		return newIcons;
	};

	var backgroundImageValueForPath = function backgroundImageValueForPath(path) {
		return '-webkit-image-set(url(\'' + retinaImage(path) + '\') 2x, url(\'' + path + '\') 1x)';
	};

	var retinaImage = function retinaImage(nonRetinaImage) {
		return nonRetinaImage.replace(/\.png/, '@2x.png');
	};

	icons = filteredIcons(icons);

	var tags = [];

	$.each(icons, function(index, path) {

		var div = $('<div>')
			.css('background-image', backgroundImageValueForPath(path))
			.addClass('thumbnail');

		tags.push(div);
	});

	$('body').append(tags);
});