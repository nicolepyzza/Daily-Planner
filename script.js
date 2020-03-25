var date;
var time;
var currentTime = moment().format("H");

$(window).on("load", function(){
    setInterval('clockUpdate()', 1000);
});

function clockUpdate() {
    date = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").html(date);
}