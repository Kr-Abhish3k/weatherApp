const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const fs = require("fs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const hbsHelpers = require("./helpers/handlebars");
var app = express();

const viewPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials");

let locationList = "";
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public"))); //set up static directory to serve
app.set("view engine", "hbs"); // to get handlebars engine set for views
app.set("views", viewPath); // to set folder handlerbar should look into to find views
app.use(bodyParser.urlencoded({ extended: true }));

//to register helper functions
hbsHelpers(hbs);

//to register partial files ro handle Bar
hbs.registerPartials(partialsPath);
/*
let partialFileNames = fs.readdirSync(partialsPath);
partialFileNames.forEach(filename => {
	let matches = /^([^.]+).hbs$/.exec(filename);
	if (!matches) {
		return;
	}
	let partialName = matches[1];
	let partialTemplate = fs.readFileSync(
		partialsPath + "/" + filename,
		"utf-8"
	);
	hbs.registerPartial(partialName, partialTemplate);
});
*/
app.get("", (request, response) => {
	response.render("index", {
		title: "weather App",
		forecast: "forecast for the day.",
		name: "Kumar Abhishek"
	});
});

app.get("/weather", (request, response) => {
	if (!request.query.location) {
		return response.render("weather", {
			title: "Weather Info",
			error: "Provide any Location!!",
			name: "Kumar Abhishek"
		});
	}
	geocode(request.query.location, (error, { body } = {}) => {
		if (error) {
			return response.render("weather", {
				title: "Weather Info",
				error: error,
				name: "Kumar Abhishek"
			});
		}

		if (body.features.length > 1) {
			locationList = body.features;
			response.render("weather", {
				title: "Weather Info",
				locationList: body.features,
				name: "Kumar Abhishek"
			});
		} else if (body.features.length === 1) {
			// WHEN ONLY ON MATCH FOR LOCATION IS FOUND
			locationList = "";
			let locationData = {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				placeName: body.features[0].place_name
			};
			forecast(locationData, (error, forecastData) => {
				if (error) {
					return response.render("weather", {
						title: "Weather Info",
						error: error,
						name: "Kumar Abhishek"
					});
				}

				response.render("weather", {
					title: "Weather Info",
					location: request.query.location,
					forecast: forecastData[0],
					name: "Kumar Abhishek",
					icontype: forecastData[1]
				});
			});
		}
	});
});
app.get("/forecast", (request, response) => {
	//WHEN USER SELECTS ONE OF THE LOCATIONS FROM LIST
	if (!request.query.location) {
		return response.render("weather", {
			title: "Weather Info",
			error: "Select any Location!!",
			locationList: locationList,
			name: "Kumar Abhishek",
			icontype: forecastData[1]
		});
	}
	let position = request.query.location.split(";");
	let locationData = {
		latitude: position[1],
		longitude: position[0],
		placeName: position[2]
	};
	forecast(locationData, (error, forecastData) => {
		if (error) {
			return response.render("weather", {
				title: "Weather Info",
				error: error,
				name: "Kumar Abhishek"
			});
		}
		response.render("weather", {
			title: "Weather Info",
			location: locationData.placeName,
			forecast: forecastData,
			name: "Kumar Abhishek",
			icontype: forecastData[1]
		});
	});
});

app.get("*", (request, response) => {
	response.render("404Page", {
		title: "Page Not Found",
		name: "Kumar Abhishek"
	});
});

app.listen(PORT, () => {
	console.log(`server started on port : ${PORT}`);
});
