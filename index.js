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
    $(".time-date").text(dateBuilder(d))
})