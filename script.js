async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    if (!response.ok) {
      throw new Error("API request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data || city === "paris") {
    alert("Something went wrong, please try again later.");
    return;
  }

  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";
  document.getElementById("main-temperature").textContent = `Temperature: ${
    data.main?.temp ?? "N/A"
  } °C`;
  document.getElementById("feels-like").textContent = `Feels Like: ${
    data.main?.feels_like ?? "N/A"
  } °C`;
  document.getElementById("humidity").textContent = `Humidity: ${
    data.main?.humidity ?? "N/A"
  }%`;
  document.getElementById("wind").textContent = `Wind Speed: ${
    data.wind?.speed ?? "N/A"
  } m/s`;
  document.getElementById("wind-gust").textContent = `Wind Gust: ${
    data.wind?.gust ?? "N/A"
  } m/s`;
  document.getElementById("weather-main").textContent = `Weather: ${
    data.weather?.[0]?.main ?? "N/A"
  }`;
  document.getElementById("location").textContent = `Location: ${
    data.name ?? "N/A"
  }`;
  console.log(data);
  const angle = data.wind.deg - 90;
  document.querySelector(
    ".icon-image"
  ).style = `transform: rotate(${angle}deg)`;
}

document.getElementById("get-weather-btn").addEventListener("click", () => {
  const selectedCity = document.getElementById("city-select").value;
  if (selectedCity) {
    showWeather(selectedCity);
  }
});
