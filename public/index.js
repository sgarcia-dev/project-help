// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getGameEvents(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    //setTimeout(function () {
    //    callbackFn(MOCK_GAME_EVENTS)
    //}, 1);

    //$.getJSON('/api/gameEvents', function(data){
    //  callbackFn(data);
    // });

    $.ajax({
        type: 'GET',
        url: '/api/gameEvents',
        contentType: 'application/json',
        dataType: 'json',
        //data: JSON.stringify(data),
        success: displayGameEvents,
        error: err => {
            alert('Internal Server Error (see console)');
            console.error(err);
        }
    });

    // });


    //DELETE GAME EVENTS
    /*  $('.deleteBtn').on('click', function(){
          $.ajax({
              type: 'DELETE',
              url: '/api/gameEvents/:id',
              success: function(data){
                  //do something with data via front nd
                  location.reload();
              }
          });
      });*/

    // });

}

// this function stays the same when we connect
// to real API later
function displayGameEvents(data) {

    //console.log(data);
    /*
    $.each(data, function () {
        $('.cards').append(`
        <button class="accordion">
            ${this.gameTitle}<br/>
          
        </button>`);
    });*/

    /////////////////////////${data.gameEvents[index].gameTitle}<br/>
    $.each(data, function () {
        //for (index in data.gameEvents) {
        //console.log(data.gameEvents.index);
        //GET THE DATE AND TIME
        var gameDate1 = parseInt(this.gameDate);
        //var date2 = new Date(myDate);
        var gameDate2 = new Date(gameDate1);
        var date = gameDate2.getDate();
        var month = gameDate2.getMonth(); //Be careful! January is 0 not 1
        var year = gameDate2.getFullYear();
        var dateString = date + "-" + (month + 1) + "-" + year;
        console.log(dateString);
        var timestamp = gameDate2.getTime();
        console.log(timestamp);
        //console.log(date);
        //var myDate = new Date();
        //myDate.toLocaleTimeString();

        //CALCULATE SPOTS LEFT - would like to do in the future
        //var currentPlayerCount = parseInt(this.attendees.length);
        //var maxPlayersCount = parseInt(this.maxPlayers);
        //var playerSpacesLeft = maxPlayersCount - currentPlayerCount;

        $('.cards').append(`
            <button class="accordion">
                ${this.gameTitle}<br/>
                ${dateString} 
            </button>
            <div class="panel">
              <p>HOST: ${this.host}</p>
              <p>DESCRIPTION: ${this.gameInfo}</p>
              <p>MAX PLAYERS: ${this.maxPlayers}</p>
              <p>LOCATION: ${this.address}</p>
              <p>TIME: ${this.gameTime}</p>
            </div>
        `)
    });

    makeCollapsible();
}

//makes the viewing games expand/collapse to show more info
function makeCollapsible() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
};



// this function can stay the same even when we
// are connecting to real API
function getAndDisplayGameEvents() {
    getGameEvents(displayGameEvents);
}




function addNewGameEvent() {
    $('#js-create-form').on('submit', function (event) {
        const gameTitle = $("#gameTitle").val();
        //const gameTitle = $gameTitle;
        const maxPlayers = $("#maxPlayers").val();
        const host = $("#userName").val();
        const street = $("#street").val();
        const city = $("#city").val();
        const state = $("#state").val();
        const zipCode = $("#zipCode").val();
        const gameInfo = $("#gameInfo").val();
        const gameDate = $("#gameDate").val();
        const gameTime = $("#gameTime").val();

        const newGame = {
            gameTitle: gameTitle,
            maxPlayers: maxPlayers,
            host: host,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            gameInfo: gameInfo,
            gameDate: gameDate,
            gameTime: gameTime
        };
        console.log(newGame);

        $.ajax({
            type: 'POST',
            url: '/api/gameEvents/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(newGame),
            success: backToDashboard,
            error: err => {
                alert('Internal Server Error (see console)');
                console.error(err);
            }
        });
        event.preventDefault();
    })
}

function backToDashboard() {
    window.location.replace('../index.html');
}



//  on page load do this
$(function () {
    getAndDisplayGameEvents(); //GET
    addNewGameEvent(); //POST
    //deleteGameEvent(); //DELETE
    //editGameEvent(); //PUT

})