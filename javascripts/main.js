"use strict";
let apiKey = {};
let getWeather = (zip) => {
	return new Promise((resolve, reject)=> {
		$.ajax({
			method:'GET',
			url:'apiKey.json'
		}).then((response) => {
			apiKey = response;
			let appID = 'APPID='+apiKey.Key;

			$.ajax({
				method:'GET',
				url:`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&${appID}`
			}).then((response) => {
				console.log('weatherData: ',response);
				// resolve(response);
			}, (errorResponseWeather) => {
				console.log('errorResponseWeather',errorResponseWeather);
				// reject(errorResponseWeather);
			});
		}, (errorResponseKey)=> {
			console.log('errorResponseKey',errorResponseKey);
			// reject(errorResponseKey);
		});
	});
};

$(document).ready(() => {
	console.log('jquery is ready');
	getWeather(38401).then((weatherData) => {
		console.log('data from weather api: ',weatherData);
	});

});