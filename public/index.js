// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_GAME_EVENTS = {
    "gameEvents": [{
            "id": "1111111",
            "host": "John Doe",
            "gameTitle": "Settlers of Catan",
            "maxPlayers": "6",
            "gameDate": "1470016976609",
            "gameTime": "",
            "location": {
                "street": "123 Main St",
                "city": "Phoenix",
                "state": "AZ",
                "zipCode": "12345"
            },
            "attendees": [{
                    "userName": "John"
                },
                {
                    "userName": "Julissa"
                },
                {
                    "userName": "Mary"
                }
            ],
            "comments": [{
                    "content": "Should we bring snacks?"
                },
                {
                    "content": "Sure. I'll provide pizza."
                },
                {
                    "content": "Running a couple minutes late."
                }
            ],
            "publishedAt": 1470016976609
        },
        {
            "id": "222222",
            "host": "Marissa",
            "gameTitle": "King of Tokyo",
            "maxPlayers": "7",
            "gameDate": "1470016976609",
            "gameTime": "",
            "location": {
                "street": "123 Main St",
                "city": "Phoenix",
                "state": "AZ",
                "zipCode": "12345"
            },
            "attendees": [{
                    "userName": "Rocio"
                },
                {
                    "userName": "Marissa"
                },
                {
                    "userName": "Sonny"
                },
                {
                    "userName": "Andy"
                }
            ],
            "comments": [{
                    "content": "Just bought an expansion."
                },
                {
                    "content": "Yay!"
                },
                {
                    "content": "I want to play the panda."
                }
            ],
            "publishedAt": 1470016976609
        },
        {
            "id": "333333",
            "host": "Andy",
            "gameTitle": "Conan",
            "maxPlayers": "4",
            "gameDate": "1470016976609",
            "gameTime": "",
            "location": {
                "street": "123 Main St",
                "city": "Phoenix",
                "state": "AZ",
                "zipCode": "12345"
            },
            "attendees": [{
                    "userName": "John"
                },
                {
                    "userName": "Kim"
                },
                {
                    "userName": "Andy"
                },
                {
                    "userName": "Mike"
                }
            ],
            "comments": [{
                    "content": "Anyone wants to run it?"
                },
                {
                    "content": "Nope."
                },
                {
                    "content": "Maybe."
                }
            ],
            "publishedAt": 1470016976609
        }
    ]
};


// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getGameEvents(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    setTimeout(function () {
        callbackFn(MOCK_GAME_EVENTS)
    }, 1);
}

// this function stays the same when we connect
// to real API later
function displayGameEvents(data) {

    for (index in data.gameEvents) {

        //GET THE DATE AND TIME
        var gameDate1 = parseInt(data.gameEvents[index].gameDate);
        //var date2 = new Date(myDate);
        var gameDate2 = new Date(gameDate1);
        var date = gameDate2.getDate();
        var month = gameDate2.getMonth(); //Be careful! January is 0 not 1
        var year = gameDate2.getFullYear();
        var dateString = date + "-" +(month + 1) + "-" + year;
        console.log(dateString);
        var timestamp = gameDate2.getTime();
        console.log(timestamp);
        //console.log(date);
        //var myDate = new Date();
        //myDate.toLocaleTimeString();



        //GET ATTENDEES

        /*for (let i=0; i<=data.gameEvents[index].attendees.length; i++) {
            gameAttendees.push(data.gameEvents[index].attendees[i].userName);
        }
        console.log(gameAttendees);
        //}
        //var attendeesArray = {};
        var attendeesArray = data.gameEvents[index].attendees.push(function(attendees){ 
            var attendeesArray = {};
            //attendeesArray.push(attendees.userName);
            attendeesArray[attendees.userName] = attendees.userName;
            return attendeesArray;
         });

         console.log(attendeesArray);

         for (let value of Object.values(data.gameEvents[index].attendees.userName)) {
          //  console.log(value);
            gameAttendees.push(userName.value);
        }
        gameAttendees.toString();
        console.log(gameAttendees);*/

        var gameAttendees = [];
        for (let i = 0; i < data.gameEvents[index].attendees.length; i++) {
            var attendee = Object.values(data.gameEvents[index].attendees[i]);
            console.log(Object.values(attendee));
            gameAttendees.push(attendee);
        }

        var gameComments = [];
        for (let i = 0; i < data.gameEvents[index].comments.length; i++) {
            var comment = Object.values(data.gameEvents[index].comments[i]);
            console.log(Object.values(comment));
            gameComments.push(comment);
        }
      


        //CALCULATE SPOTS LEFT
        var currentPlayerCount = parseInt(data.gameEvents[index].attendees.length);
        var maxPlayersCount = parseInt(data.gameEvents[index].maxPlayers);
        var playerSpacesLeft = maxPlayersCount - currentPlayerCount;

        $('.cards').append(`
        <button class="accordion">
            ${data.gameEvents[index].gameTitle}<br/>
            ${dateString}   
            ${playerSpacesLeft} spaces left!
        </button>
        <div class="panel">
          <p>HOST: ${data.gameEvents[index].host}</p>
          <p>DESCRIPTION: ${data.gameEvents[index].content}</p>
          <p>MAX PLAYERS: ${data.gameEvents[index].maxPlayers}</p>
          <p>ATTENDEES: ${gameAttendees}</p>
          <p>COMMENTS: ${gameComments}</p>
        </div>
    `);
    }
    makeCollapsible();
}

      

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayGameEvents() {
    console.log("get display");
    getGameEvents(displayGameEvents);
}


function makeCollapsible(){        
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
};


//  on page load do this
$(function () {
    getAndDisplayGameEvents();
})

//  enableGoToLogin();
/*
$("#read").on('click', function (event) {
    console.log("reading");
    event.preventDefault();
    getAndDisplayGameEvents();
});*/


/*NOTES FROM SUNDAY 5:40 
comments.map(function(commment) {
  return `<h1>${comment.content}</h1>`;
}).join('\n')

$("div.cards").click('div.card', function(e){

    travis encrypt $(heroku auth:token) --add deploy.api_key


*/