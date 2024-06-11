

const dateBuilder = () => {
    let d = new Date;

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minuts = d.getMinutes();
    let seconds = d.getSeconds();

    minuts = minuts < 10 ? '0' + minuts : minuts;
  
    return `${hour}:${minuts}:${seconds} ${day}, ${date} ${month} ${year}`;
};
$(document).ready(function(){

    let apiKey = '320cbe9c0b7fc6c430d04127cfe24661';
    let city = 'New Delhi';

    function fetchWeather(city){
        $.ajax({
            url : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
            type : 'GET',
            dataType : 'json',
            success : function(data){

                $('.weather-icon').html("<img class='text-center' src='https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png' height='50px' width='50px'>")
    
                $(".city-name").text(data.name);
                $("#country").text(data.sys.country)
                $(".temprat").text(data.main.temp + "°");
                $(".condition").text(data.weather[0].description)
                $(".wind").text(data.wind.speed + "Km/h")
                $(".humidity").text(data.main.humidity+"%")
                $(".cloud").text(data.clouds.all+"%")
                $(".visiblity").text(data.visibility+"%")
    
            },
            error: function(error) {
                console.log('Error:', error);
                // alert('Failed to fetch weather data. Please check the city name and try again.');
            }
        })
    };
    fetchWeather(city);

    setInterval(() => {
        fetchWeather(city);
    }, 6000);

    $(".time-date").text(dateBuilder());
    setInterval(() => {
        $(".time-date").text(dateBuilder());
    }, 1000);

    $("#locatn-inp").on('submit', function(e) {
        e.preventDefault();
        city = $(".search").val();
        if (city) {
            fetchWeather(city);
        }
    });
})