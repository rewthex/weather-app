import { DUMMY_DATA } from './dummydata.js';

// const API_KEY = '6A5BZCC93UM99R3GT2ARTW6QK';

async function getWeatherData(city = 'Portland') {
	// const response =
	// 	await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions%2Cdescription%2Cicon&include=fcst%2Chours%2Ccurrent%2Cdays&key=${API_KEY}&options=nonulls&contentType=json
	// `);
	// const weatherData = await response.json();

	return DUMMY_DATA;
}

function formatWeatherData() {
	getWeatherData().then((data) => {
		const currentConditions = data.currentConditions;
		const futureConditions = data.days.map((day) => {
			return {
				conditions: day.conditions,
				datetime: day.datetime,
				description: day.description,
				icon: day.icon,
				temp: day.temp,
				tempmax: day.tempmax,
				tempmin: day.tempmin,
			};
		});
    console.log(currentConditions);
		console.log(futureConditions);
	});
}

formatWeatherData();
