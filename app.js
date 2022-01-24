const express = require("express");
const https = require("https");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd7f6b4a7214fcb0c38c1eb77703a58c&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            // res.send("The temperature in London is " + temp + "degree celcius.");
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("The weather data is currently " + weatherDescription);
            res.write("<h5>The temperature in London is " + temp + "degree celcius.</h5>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
})

app.listen(PORT, () => {
    console.log("server is started running");
});
