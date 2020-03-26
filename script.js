// Set appropriate variables
var realTime;
var currentHour = moment().format('H');
var array = [];
var retrievedAppt;
var showAppt;
var appt;
var timeID;
var text;
var timeIndex;
var currentDiv;

// On load function
$(window).on("load", function () {
    // Call clockUpdate function and refresh every second
    setInterval('clockUpdate()', 1000);

    // Function that will grab any previously saved data in local storage and display
    // it on screen in the appropriate textareas.
    function getApptInfo() {
        retrievedAppt = JSON.parse(localStorage.getItem('appts'));
        if (retrievedAppt !== null) {
            for (i = 0; i < retrievedAppt.length; i++) {
                showAppt = retrievedAppt[i];
                details = showAppt.details;
                timeIndex = showAppt.time;
                timeIndex.replace(':00', '');
                if (details !== null) {
                    $("#" + timeIndex).val(details);
                }
            }
        }
    }

    // Call the function to grab data in local storage upon page load
    getApptInfo();

});

// For each div, compare div id to the current hour and assign the appropriate CSS class
for (i = 0; i < 23; i++) {
    currentDiv = i;
    if (currentHour == i) {
        $('#' + currentDiv).addClass('present');
    } else if (currentHour > i) {
        $('#' + currentDiv).addClass('past');
    } else {
        $('#' + currentDiv).addClass('future');
    }
}

// Using moment.js, add a clock/counter and display at the top of the page
function clockUpdate() {
    realTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").html(realTime);
}

// On click for each save button, save the data of each text area AND
// the id of the textarea div to local storage as an array.
$(".saveBtn").on("click", function () {
    //get textarea's value
    text = $(this).parent('div').children('div').children('textarea').val();
    timeID = $(this).parent('div').children('div').children('textarea').attr('id');
    appt = {
        time: timeID,
        details: text
    }
    array = JSON.parse(localStorage.getItem('appts'));
    if (array === null) {
        localStorage.setItem('appts', JSON.stringify([{ time: timeID, details: text }]));
    } else {
        array.push(appt);
        localStorage.setItem('appts', JSON.stringify(array));
    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + text.addClass("textarea") + '</textarea>'));
});