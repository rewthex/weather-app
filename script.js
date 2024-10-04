import { DUMMY_DATA } from './dummydata.js';

// const API_KEY = '6A5BZCC93UM99R3GT2ARTW6QK';

async function getWeatherData(city = 'Portland') {
	// const response =
	// 	await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions%2Cdescription%2Cicon&include=fcst%2Chours%2Ccurrent%2Cdays&key=${API_KEY}&options=nonulls&contentType=json
	// `);
	// const weatherData = await response.json();
	const weatherData = await new Promise((resolve) => {
		setTimeout(() => resolve(DUMMY_DATA), 0.5);
	});

	hideLoadingState();
	formatWeatherData(weatherData);
}

function formatWeatherData(data) {
	const currentConditions = data.currentConditions;
	currentConditions.location = data.resolvedAddress;

	const futureConditions = data.days.map((day) => {
		return {
			date: day.datetime.slice(5),
			icon: day.icon,
			temp: day.temp,
		};
	});
	renderCurrentConditions(currentConditions);
	renderFutureConditions(futureConditions);
}

function renderCurrentConditions(currentConditions) {
	const { conditions, location, icon, temp } = currentConditions;
	const currentWeatherContainer = document.querySelector('.current-weather');

	const iconImg = createElement('img', 'current-icon', `./icons/${icon}.svg`);
	const tempHeading = createElement('h1', 'current-temp', '', `${temp}°`);
	const locationHeading = createElement('h2', 'current-location', '', location);
	const conditionHeading = createElement(
		'h1',
		'current-condition',
		'',
		conditions
	);

	currentWeatherContainer.append(
		iconImg,
		tempHeading,
		locationHeading,
		conditionHeading
	);
}

function renderFutureConditions(futureConditions) {
	const weatherForecast = document.querySelector('.weather-forecast');
	for (let index in futureConditions) {
		const dailyContainer = createElement('div', 'daily-forecast');
		const date = futureConditions[index].date;
		const dateHeading = createElement('h3', 'daily-date', '', date);
		const icon = futureConditions[index].icon;
		const iconImg = createElement('img', 'daily-icon', `./icons/${icon}.svg`);
		const temp = futureConditions[index].temp;
		const tempHeading = createElement('h2', 'daily-temp', '', `${temp}°`);
		dailyContainer.append(dateHeading, iconImg, tempHeading);
		weatherForecast.appendChild(dailyContainer);
	}
}

function createElement(type, classname, src = '', innerText = '') {
	const element = document.createElement(type);
	if (src) element.src = src;
	if (classname) element.classList.add(classname);
	if (innerText) element.innerText = innerText;
	return element;
}

function hideLoadingState() {
	const searchAndLocationContainer = document.querySelector(
		'.search-and-location'
	);
	const currentWeatherContainer = document.querySelector('.current-weather');
	const weatherForecastContainer = document.querySelector('.weather-forecast');

	searchAndLocationContainer.innerHTML = '';
	currentWeatherContainer.innerHTML = '';
	weatherForecastContainer.innerHTML = '';
}

getWeatherData();
