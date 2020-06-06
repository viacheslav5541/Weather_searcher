


//Функция для получения текущей геолокации и ее передачи  в receiveData
function getWeather() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        receiveData(position.coords.latitude, position.coords.longitude); 
      })
    } else {
      alert('Could not get location.');
    }
  }
  
//Принимает геолокацию и,если ответ положительный, передача данных в функцию  displayweather
function receiveData(lat, long) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long +'&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
      .then(function (response) {
        return response.json();
       
      })
      .then(function (response) {
        
        displayWeather(response);
      })

  }
  
  
  function status(response) {  
    if (response.status >= 200 && response.status < 300) {  
      return Promise.resolve(response)  
    } else {  
      return Promise.reject(new Error(response.statusText))  
    }  
  }
  
  function json(response) {  
    return response.json()  
  }


//Функция для получения погоды в введенном городе, если ответ положительный вызов функции displayweather
  function receiveDatabyName() {

      var city_name = document.getElementById("inputname").value;
      console.log(city_name);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
    .then(status)
    .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        
        displayWeather(response);
      }).
      catch(function(error) {  
        alert('City is not existing,try again');  
      });
    
      
      
      
  }



  
//Отображение полученных данных
function displayWeather(data){
var summary_weather = "Country - "
+ data.sys.country
+ '\nWeather - '
+ data.weather[0].main
+ '\nDescription - '
+ data.weather[0].description;

document.getElementById("current-humidity").textContent = "Humidity - " + data.main.humidity;
document.getElementById("current-pressure").textContent = "Pressure - " + data.main.pressure;
document.getElementById("current-temperature").textContent = "Temperature - " + Math.round(data.main.temp - 273);
document.getElementById("current-wind-speed").textContent = "Wind speed - " + data.wind.speed;
document.getElementById("weather-summary").textContent = summary_weather;

}

// функция распознает речь,после этого преобразовывает полученный ответ в массив и отправляет его в функцию voice_search(ниже), которая
// идет по массиву и пытается найти город и получить по нему погоду, если такой найдется,то все сразу отобразится
function sayPlease() {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-EN';
    var p = ""
    var words = document.getElementById('inputname');
    words.value = " "
    words.value += p;   
    recognition.addEventListener('result', function (event) {
      p = Array
        .from(event.results)
        .map(function (results) {
          return results[0];
        })
        .map(function (results) {
          return results.transcript;
        })
        .join('');
      if(event.results[0].isFinal) {
        words.value+=p;
        var words_arr = words.value.split(" ");
        console.log(words_arr);
        voice_search(words_arr);
      }
    });
    
    
    // recognition.addEventListener('end', recognition.start);
    
    recognition.start();





}


function voice_search(saydata){
    var city;
    var keks = saydata.map(function (item) {

        console.log(item.substr(0,0))

        if(item[0] === item.substr(0,1).toUpperCase()) city = item;

    });

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
        .then(status)
        .then(function (response) {
            return response.json();
          })
          .then(function (response) {

            displayWeather(response);

          });




  }

