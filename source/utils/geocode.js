const request = require("request");

const getGeocode = (Location, callback) => {
	const LocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		Location
	)}.json?access_token=pk.eyJ1Ijoia3VtYXJqaSIsImEiOiJjano4ajBuZncwOWR6M2RteHBmbGs1aTA2In0.smyJeRzjvyLasajVHZFmlw&limit=10&autocomplete=false&fuzzyMatch=false`;

	request({ url: LocationUrl, json: true }, (error, { body } = {}) => {
		// to avoid destructring error  when null/undefined is received, assign a defult empty object
		if (error) {
			callback(
				"Unable to connect to Loaction Services.",
				undefined
			);
		} else if (body.features.length === 0) {
			callback(
				"Unable to find the Location. Try another search.",
				undefined
			);
		} else {
			callback(undefined, { body });
		}
	});
};

module.exports = getGeocode;
