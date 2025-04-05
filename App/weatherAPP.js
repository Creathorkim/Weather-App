const apiKey = "TAP66PPKJXVCATBMZQCX7KGZH";
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const weatherForm = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const loadingEl = document.getElementById("loading");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorMsg = document.getElementById("errorMsg");

async function fetchData(location) {
  const apiUrl = `${url}/${encodeURIComponent(
    location
  )}?key=${apiKey}&unitGroup=metric&contentType=json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }
    const data = await response.json();
    return processedData(data);
  } catch {
    throw new Error("Failed to fetch weather data. Please try again.");
  }
}

function processedData(data) {
  const today = data.days[0];
  return {
    location: data.resolvedAddress,
    temperature: today.temp,
    description: today.conditions,
    icon: today.icon,
  };
}

function displayWeather(weather) {
  weatherDisplay.innerHTML = `
  <h2> ${weather.location} <h2>
  <p class="lead">${weather.temperature}°C</p>
  <p class="text-capitalize">${weather.description}</p>
  `;
}

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  weatherDisplay.innerHTML = "";
  loadingEl.classList.remove("d-none");

  const location = locationInput.value.trim();
  try {
    const weather = await fetchData(location);
    displayWeather(weather);
  } catch (err) {
    errorMsg.textContent = err.message;
  } finally {
    loadingEl.classList.add("d-none");
  }
});
