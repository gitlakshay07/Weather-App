let d = new Date;

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    const hour = d.getHours();
    const minuts = d.getMinutes();
  
    return `${hour}:${minuts} ${day}, ${date} ${month} ${year}`;
};

$(document).ready(function(){

    let apiKey = '320cbe9c0b7fc6c430d04127cfe24661'
    let city = 'jaipur'

    $.ajax({
        url : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        type : 'GET',
        dataType : 'json',
        success : function(data){

            $(".city-name").text(data.name);
            $(".temprat").text(data.main.temp + "°c");
            $(".condition").text(data.weather[0].description)
            $(".wind").text(data.wind.speed + "Km/h")
            $(".humidity").text(data.main.humidity+"%")
            $(".cloud").text(data.clouds.all+"%")

        },
        error: function(error) {
            console.log('Error:', error);
        }
    })

    $(".time-date").text(dateBuilder(d))
})


