console.log("Client side Javascript Loaded!!");
/*
let form = document.querySelector("form");
let searchInput = document.querySelector(".searchBox");

form.addEventListener("submit", event => {
	event.preventDefault();
	let location = searchInput.value.trim();
	console.log(location);
	if (location.length > 0) {
		fetch("http://localhost:3000/weather?location=" + location).then(
			response => {
				response.json().then(data => {
					if (data.error) {
						console.log(data.error);
						return;
					}

					console.log(data.location);
					console.log(data.forecast);
				});
			}
		);
	} else {
		console.log("provide any address");
	}
});*/
/*
fetch(
	`https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1Ijoia3VtYXJqaSIsImEiOiJjano4ajBuZncwOWR6M2RteHBmbGs1aTA2In0.smyJeRzjvyLasajVHZFmlw&limit=1`
).then(response => {
	response.json().then(data => {
		if (data.features.length === 0) {
			console.log("Unable to find the Location.");
		} else {
			let latitude = data.features[0].center[1],
				longitude = data.features[0].center[0];

			fetch(
				`https://api.darksky.net/forecast/f1775e9226c4391decd371eed56cf3ac/${encodeURIComponent(
					latitude
				)},${encodeURIComponent(longitude)}?units=si`
			).then(response => {
				response.json().then(data => {
					console.log(data.daily.summary);
				});
			});
		}
	});
});*/
