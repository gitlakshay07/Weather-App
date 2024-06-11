// DATE
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
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hour}:${minuts}:${seconds} ${day}, ${date} ${month} ${year}`;
};
// DATE

$(document).ready(function(){

    let apiKey = '320cbe9c0b7fc6c430d04127cfe24661';
    let city = 'New Delhi';

    // Fetch Waeather

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
                alert('Failed to fetch weather data. Please check the city name and try again.');
            }
        })
    };
    fetchWeather(city);

    // Fetch Waeather

   //Show Time

   $(".time-date").text(dateBuilder());

   setInterval(() => {
       $(".time-date").text(dateBuilder());
   }, 1000);

   //Show Time


   function initAutocomplete() {

        let Input = $('#autocomplete-search');
        const autocomplete = new google.maps.places.Autocomplete(Input);

        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                city = place.name;
                fetchWeather(city);
            }
            // $('#lat').val(place.geometry['location'].lat());
            // $('#long').val(place.geometry['location'].lat());
        });
    }
    initAutocomplete();

    $("#locatn-inp").on('submit', function(e) {
        e.preventDefault();
        city = $(".search").val().trim();

        if (city) {
            fetchWeather(city);
        }
    });

    setInterval(() => {
        fetchWeather(city);
    }, 600000);
})