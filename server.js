const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

//make request to OpenWeatherMap API
const apiKey = '5fe50f6a66c39ea9c782b233622d8d9f';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
console.log(url);
console.log(city)

request(url, function (err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index',  {weather: null, error: 'Error, please try again later'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in  ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function() {
  console.log('weather app listening on port 3000');
})
