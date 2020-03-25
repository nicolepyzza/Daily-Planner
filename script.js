var date;
var time = moment().format("H");
var currentDiv;

$(window).on("load", function(){
   
    setInterval('clockUpdate()', 1000);

   for (i=0; i<=23; i++) {
        currentDiv = i;
        if (time == i) {
            $('#' + currentDiv).addClass("present");
            $('#' + currentDiv).children('div').children('div').children("textarea").addClass("present");
        } else if (time > i) {
            $('#' + currentDiv).addClass("past");
            $('#' + currentDiv).children('div').children('div').children("textarea").addClass("past");
        } else if (time < i) {
            $('#' + currentDiv).addClass("future");
            $('#' + currentDiv).children('div').children('div').children("textarea").addClass("future"); 
        }
    }
});

function clockUpdate() {
    date = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").html(date);
}

