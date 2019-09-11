function hbsHelpers(hbs) {
	hbs.registerHelper("breaklines", function(text) {
		text = hbs.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
		return new hbs.SafeString(text);
	});

	hbs.registerHelper("list", function(items, options) {
		var out = `<p class="notification is-info">Multiple locations with similar name found.</br>Select any one location</p>
                    <div class='control location_list clearfix'>`;

		for (var i = 0, l = items.length; i < l; i++) {
			let value =
				items[i].center[0] +
				";" +
				items[i].center[1] +
				";" +
				items[i].place_name;
			out =
				out +
				`<div class="card location_list_item">
                    <header class="card-header has-background-grey-light">
                        <input class='card-header-select' id =${items[i].id} type='radio' name='location' value="${value}">
                        <label for=${items[i].id} class="card-header-title">${items[i].text}</label>
                    </header>
                    <div class="card-content has-background-white-ter">
                     <div class="content">
                         <span>${items[i].place_name}</span>
                     </div>
                    </div>
                </div>`;
		}
		return (
			out +
			`</div><input class="button location_list_submit" type='submit' value='submit'>`
		);
	});

	// More helpers...
}

module.exports = hbsHelpers;
