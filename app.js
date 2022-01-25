const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "bd7f6b4a7214fcb0c38c1eb77703a58c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

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
            res.write("<h5>The temperature in " + query + " is " + temp + "degree celcius.</h5>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
})

app.listen(PORT, () => {
    console.log("server is started running");
});
