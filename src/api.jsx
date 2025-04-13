import { useState, useEffect } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;
const QUERY = "Brisbane";

function getForecastByQuery(q) {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}`)
        .then(r => r.json())
        .then(j => j.forecast.forecastday[0].hour)
        .then(hours => hours.map(hour => ({
            time: new Date(hour.time).toLocaleString("en-AU", {timeZoneName: "short"}),
            temp: hour.temp_c,
            wind: hour.wind_kph
        })));
}

export function useWeather(search) {
    const [loading, setLoading] = useState(true);
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getForecastByQuery(search)
        .then(forecast => {
            setHeadlines(forecast);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }, [search]);

    return {
        loading,
        headlines,
        error
    };
}