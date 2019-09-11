const request = require("request");

const getWeather = ({ latitude, longitude, placeName } = {}, callback) => {
	const WeatherUrl = `https://api.darksky.net/forecast/f1775e9226c4391decd371eed56cf3ac/${encodeURIComponent(
		latitude
	)},${encodeURIComponent(longitude)}?units=si`;

	request({ url: WeatherUrl, json: true }, (error, { body } = {}) => {
		// to avoid destructring error  when null/undefined is received, assign a defult empty object
		if (error) {
			callback(
				"Unable to connect to Weather Services" + error,
				undefined
			);
		} else if (body.error) {
			callback(
				"Location not found. Try another Request.",
				undefined
			);
		} else {
			const currentForecast = body.currently;
			callback(undefined, [
				`${body.daily.summary}.The current weather outside in ${placeName}, in Timezone ${body.timezone} is ${currentForecast.summary}, Temperature being ${currentForecast.temperature} degree Celcius , with windSpeed of ${currentForecast.windSpeed} and humidity of  ${currentForecast.humidity}. There is ${currentForecast.precipProbability} percent Chance of Rain. \n 
                Highest Temperatute :- ${body.daily.data[0].temperatureHigh} \n
                Lowest Temperature:- ${body.daily.data[0].temperatureLow} \n
                Feels Like:- ${body.currently.temperature}`,
				body.currently.icon
			]);
		}
	});
};

module.exports = getWeather;
