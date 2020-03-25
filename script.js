var realTime;
var currentHour = moment().format("H");
var array = [];
var retrievedAppt;
var showAppt;
var appt;
var timeID;
var text;
var timeIndex;

$(window).on("load", function(){
    setInterval('clockUpdate()', 1000);
    //check local storage for textarea's value

    function getApptInfo(){
        retrievedAppt = JSON.parse(localStorage.getItem('appts'));
        if (retrievedAppt !== null) {
            for (i=0; i<retrievedAppt.length; i++) {
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

    getApptInfo();

});

function clockUpdate() {
    realTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").html(realTime);
}

$(".saveBtn").on("click", function(){
    //get textarea's value
    text = $(this).parent('div').children('div').children('textarea').val();
    timeID = $(this).parent('div').children('div').children('textarea').attr('id');
    appt = {
        time: timeID,
        details: text
    }
    //put it into local storage
    array = JSON.parse(localStorage.getItem('appts'));
    if (array === null) {
        localStorage.setItem('appts', JSON.stringify([{ time: timeID, details: text }]));
    } else {
        array.push(appt);
        localStorage.setItem('appts', JSON.stringify(array));
    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + text.addClass("textarea") + '</textarea>'));
});