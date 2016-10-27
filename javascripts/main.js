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
				// console.log('weatherData: ',response);
				resolve(response);
			}, (errorResponseWeather) => {
				// console.log('errorResponseWeather',errorResponseWeather);
				reject(errorResponseWeather);
			});
		}, (errorResponseKey)=> {
			// console.log('errorResponseKey',errorResponseKey);
			reject(errorResponseKey);
		});
	});
};

$(document).ready(() => {
	console.log('jquery is ready');
	$('#clicky-button').on('click',() => {
		$('#clicky-button').button('loading');
		$('#output').html("");
		let searchy = $('#zip-search').val();
		console.log('its working', searchy);

		getWeather(searchy).then((weatherData) => {
			$('#clicky-button').button('reset');
			console.log('data from weather api: ',weatherData);
			$('#output').append(`<h1>${weatherData.name}</h1>`);
			$('#output').append(`<h1>${weatherData.weather[0].description}</h1>`);
			$('#output').append(`<h1>${weatherData.main.temp}&#x2109;</h1>`);
			$('#output').append(`<h1>${weatherData.wind.speed} MPH</h1>`);
			$('#output').append(`<h1>${weatherData.main.pressure}</h1>`);

		}).catch((error) => {
				$('#clicky-button').button('reset');
		});
	});
});