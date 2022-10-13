/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const zipCode = document.getElementById("zip");
const feeling = document.getElementById("feelings");
const date = document.getElementById("date").value;
const temp = document.getElementById("temp").value;
const apiKey = ",&appid=0037519f96e8be6a8e28bf476d60fd4e&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateData = document.getElementById("generate");

// Get Zip Code Information From Api */
async function getCityZipCode(zipCode) {
  try {
    const data = await (await fetch(baseURL + zipCode + apiKey)).json();
    console.log("getCityZipCode: ", data);
    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout((_) => (error.innerHTML = ""), 2000);
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

const appData = async (data) => {
  try {
    if (data.cod != 200) {
      return data;
    }
    let info = {
      content: feeling.value,
      date: newDate,
      temp: data.main.temp,
    };
    return info;
  } catch (e) {
    console.log(e);
  }
};

const postData = async (url = "", data = {}) => {
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

generateData.addEventListener("click", (event) => {
  event.preventDefault();
  let URL = `${baseURL}${zipCode.value}${apiKey}`;

  getCityZipCode(zipCode.value).then((data) => {
    appData(data).then((data) => {
      postData("/postData", data)
        .then((data) => {})
        .then(() => retrieveData());
    });
  });
});

const retrieveData = async () => {
  const request = await fetch("/getAll");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};