function hbsHelpers(hbs) {
	return hbs.create({
		helpers: {
			list: function(items, options) {
				var out = "<ul>";

				for (var i = 0, l = items.length; i < l; i++) {
					out =
						out +
						"<li>" +
						options.fn(items[i]) +
						"</li>";
				}

				return out + "</ul>";
			}

			// More helpers...
		}
	});
}

module.exports = hbsHelpers;
