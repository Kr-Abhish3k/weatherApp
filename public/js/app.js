let position = [],
	zoomLevel,
	addLabel = false;

if (document.querySelector("body").classList.contains("weatherPage")) {
	let iconType = document.querySelector("#iconType").textContent;
	document.querySelector(".forecast_image").style.backgroundImage =
		'url("/icons/' + iconType + '.svg")';
}

if (document.querySelector("#position")) {
	position = document.querySelector("#position").textContent.split(",");
	zoomLevel = 9;
	addLabel = true;
} else {
	zoomLevel = 2;
	position = [0, 0];
}

var size = 100;
mapboxgl.accessToken =
	"pk.eyJ1Ijoia3VtYXJqaSIsImEiOiJjano4ajBuZncwOWR6M2RteHBmbGs1aTA2In0.smyJeRzjvyLasajVHZFmlw";
var map = new mapboxgl.Map({
	container: "map", // container id
	style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
	center: [position[0], position[1]], // starting position [lng, lat]
	zoom: zoomLevel // starting zoom
});

var pulsingDot = {
	width: size,
	height: size,
	data: new Uint8Array(size * size * 4),

	onAdd: function() {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext("2d");
	},

	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;

		var radius = (size / 2) * 0.3;
		var outerRadius = (size / 2) * 0.7 * t + radius;
		var context = this.context;

		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(
			this.width / 2,
			this.height / 2,
			outerRadius,
			0,
			Math.PI * 2
		);
		context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
		context.fill();

		// draw inner circle
		context.beginPath();
		context.arc(
			this.width / 2,
			this.height / 2,
			radius,
			0,
			Math.PI * 2
		);
		context.fillStyle = "rgba(255, 100, 100, 1)";
		context.strokeStyle = "white";
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();

		// update this image's data with data from the canvas
		this.data = context.getImageData(
			0,
			0,
			this.width,
			this.height
		).data;

		// keep the map repainting
		map.triggerRepaint();

		// return `true` to let the map know that the image was updated
		return true;
	}
};

function pinLocation(position) {
	map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

	map.addLayer({
		id: "points",
		type: "symbol",
		source: {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [
								position[0],
								position[1]
							]
						}
					}
				]
			}
		},
		layout: {
			"icon-image": "pulsing-dot"
		}
	});
}

if (addLabel) {
	map.on("load", pinLocation(position));
}
