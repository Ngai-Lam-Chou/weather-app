var url;

async function getTemp() {
  const response = await fetch(url);
  const data = await response.json();
  document.getElementById(
    "temp"
  ).innerText = `Max Temperature : ${JSON.stringify(
    Math.round(((data.days[0].tempmax - 32) * 5) / 9)
  )}°C\n
    Current Temperature : ${JSON.stringify(
      Math.round(((data.days[0].temp - 32) * 5) / 9)
    )}°C\n
    Min Temperature : ${JSON.stringify(
      Math.round(((data.days[0].tempmin - 32) * 5) / 9)
    )}°C\n`;
}

async function getCondition() {
  const response = await fetch(url);
  const data = await response.json();
  document.getElementById("conditions").innerText =
    data.days[0].conditions + "\n";
  document.querySelector(
    "img"
  ).src = `condition_images/${data.days[0].icon}.png`;
}

async function getLocation() {
  const response = await fetch(url);
  const data = await response.json();
  document.querySelector("h1").innerText =
    `${data.address}`.charAt(0).toUpperCase() + `${data.address}`.slice(1);
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(image/${data.address}.jpg)`;
}

async function changeLocation(address) {
  try {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?unitGroup=us&include=current&key=WVGNQMSX3PTP72YYZETFA7NB7&contentType=json`;
    await getTemp();
    await getCondition();
    await getLocation();
  } catch (error) {
    document.querySelectorAll("h1")[1].innerText = "Exceed API Use Limit\nCome Again Tommorow";
  }
}

changeLocation("vancouver");
