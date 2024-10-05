import { DUMMY_DATA } from './dummydata.js';

const API_KEY = '6A5BZCC93UM99R3GT2ARTW6QK';
let city;

async function getWeatherData() {
	const searchInput = document.querySelector('.search-input');
	if (searchInput.value) {
		city = searchInput.value;
	} else {
		city = 'Portland';
	}
	const response =
		await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions%2Cdescription%2Cicon&include=fcst%2Chours%2Ccurrent%2Cdays&key=${API_KEY}&options=nonulls&contentType=json
	`);
	const weatherData = await response.json();

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
	renderLocation(currentConditions.location);
	renderCurrentConditions(currentConditions);
	renderFutureConditions(futureConditions);
}

function renderLocation(location) {
	const locationSpan = document.querySelector('.current-location');
	locationSpan.innerText = '';
	locationSpan.innerText = location;
}

function renderCurrentConditions(currentConditions) {
	const { conditions, icon, temp } = currentConditions;
	const currentWeatherContainer = document.querySelector('.current-weather');

	const iconImg = createElement('img', 'current-icon', `./icons/${icon}.svg`);
	const tempHeading = createElement('h1', 'current-temp', '', `${temp}°`);
	const conditionHeading = createElement(
		'h1',
		'current-condition',
		'',
		conditions
	);

	currentWeatherContainer.append(iconImg, tempHeading, conditionHeading);
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
	const currentWeatherContainer = document.querySelector('.current-weather');
	const weatherForecastContainer = document.querySelector('.weather-forecast');

	currentWeatherContainer.innerHTML = '';
	weatherForecastContainer.innerHTML = '';
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', getWeatherData);

getWeatherData();
