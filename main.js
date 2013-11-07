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
		return nonRetinaImage.replace(/\.png$/, '@2x.png');
	};

	var selectedImage = function selectedImage(nonSelectedImage) {
		return nonSelectedImage.replace(/\/Gray\//, '/Gray Selected/').replace(/\.png$/, '-selected.png');
	}

	icons = filteredIcons(icons);

	var tags = [];

	$.each(icons, function(index, path) {

		var div = $('<div>')
			.css('background-image', backgroundImageValueForPath(path))
			.addClass('thumbnail')
			.attr('data-img', path);

		tags.push(div);
	});

	var imagePreviewElement = function imagePreviewElement(path, label) {
		return $('<div>')
			.addClass('preview')
			.append([
				$('<div>').addClass('imagebox').append($('<img>').attr('src', path)),
				$('<span>').text(label)]);
	}

	var toggleSelected = function toggleSelected(tags) {
		tags.each(function(index, el) {
			var tag  = $(el);
			var path = tag.attr('data-img');

			if (!tag.hasClass('selected')) {
				toggleSelected($('.selected'));
				tag.addClass('selected');
				tag.css('background-image', backgroundImageValueForPath(selectedImage(path)));

				var details = $('<div>').addClass('detail');

				details.append([
						imagePreviewElement(path, '@1x'),
						imagePreviewElement(retinaImage(path), '@2x'),
						imagePreviewElement(selectedImage(path), 'selected @1x'),
						imagePreviewElement(retinaImage(selectedImage(path)), 'selected @2x')
					]);

				$('body').append(details);
			} else {
				tag.removeClass('selected');
				tag.css('background-image', backgroundImageValueForPath(path));

				$('.detail').remove();
			}
		});
	}

	$('#thumbs').append(tags);

	$('.thumbnail').click(function(e) {
		toggleSelected($(e.target));
	});
});