var url;
var weatherData;

async function fetchData() {
  const response = await fetch(url);
  weatherData = await response.json();
}

async function getTemp() {
  document.getElementById("curr-temp").innerText = `${JSON.stringify(Math.round(((weatherData.days[0].temp - 32) * 5) / 9))}°\n`
  document.getElementById("temp").innerText = `H:${JSON.stringify(Math.round(((weatherData.days[0].tempmax - 32) * 5) / 9)
  )}° L:${JSON.stringify(
      Math.round(((weatherData.days[0].tempmin - 32) * 5) / 9)
    )}°\n`;
}

async function getCondition() {
  document.getElementById("conditions").innerText =
    weatherData.days[0].conditions.split(",")[0]
    .trim() + "\n";
}

async function getLocation() {
  document.querySelectorAll("h1")[1].innerText = `${weatherData.resolvedAddress
    .split(",")[0]
    .trim()}`;
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(image/${weatherData.resolvedAddress
    .split(",")[0]
    .trim()}.jpg)`;
}

async function changeLocation(address) {
  try {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?unitGroup=us&include=current&key=WVGNQMSX3PTP72YYZETFA7NB7&contentType=json`;
    await fetchData();
    await getTemp();
    await getCondition();
    await getLocation();
  } catch (error) {
    document.querySelectorAll("h1")[1].innerText =
      "Exceed API Use Limit\nCome Again Tomorrow";
  }
}

changeLocation("vancouver");
