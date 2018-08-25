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
        var myDate = parseInt(data.gameEvents[index].gameDate);
        var date = new Date(myDate);
        //console.log(date);
        //var myDate = new Date();
        //myDate.toLocaleTimeString();

        //CALCULATE SPOTS LEFT
        var currentPlayerCount = parseInt(data.gameEvents[index].attendees.length);
        var maxPlayersCount = parseInt(data.gameEvents[index].maxPlayers);
        var PlayerSpacesLeft = maxPlayersCount - currentPlayerCount;

        $('.cards').append(`
        <div class="card">
        <div class="card-title">${data.gameEvents[index].gameTitle}
            <a href="#" class="toggle-info btn">
                <span class="left"></span>
                <span class="right"></span>
            </a>
            <h2>
            ffffffffffff
                <small>ddddddddddd</small>
            </h2>
        </div>
        <div class="card-flap flap1">
            <div class="card-description">
                This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available
                etc.
            </div>
            <div class="card-flap flap2">
                <div class="card-actions">
                    <a href="#" class="btn">Read more</a>
                </div>
            </div>
        </div>
    </div>

    `);
}
}

/*


        //////////////////////
        
        <div class=" card [ is-collapsed ] ">
            <div class="card__inner [ js-expander ]">
                ${data.gameEvents[index].gameTitle}<br/> 
                ${date}<br/>
                ${PlayerSpacesLeft} spots left!<br/>
            </div>
            <div class="card__expander">
                        <i class="fa fa-close [ js-collapser ]"></i>
                        Expander
                    </div>
        </div>
      

        <div class="row">
          <div class="col-6"> 
            <ul>
              <lh>${data.gameEvents[index].gameTitle} </lh>
              <li>${date}</li>
              <li>${PlayerSpacesLeft} spots left!</li>
              <div class="moreInfo">
              <li>${data.gameEvents[index].gameTime}</li>
              <li>${data.gameEvents[index].location[index]}</li>
              <li>${data.gameEvents[index].attendees}</li>
              <li>${data.gameEvents[index].comments}</li>
              </div>
            </ul>
          </div>  
          <div class="col-6"> 
            <button onclick="showMoreInfo()">More Info</button>
          </div>  
        </div> 
*/
///////////////////////////



$(document).ready(function(){
    var zindex = 10;
    
    $("div.card").click(function(e){
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("show")) {
        isShowing = true
      }
  
      if ($("div.cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.show")
          .removeClass("show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.cards")
            .removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this)
            .css({zIndex: zindex})
            .addClass("show");
  
        }
  
        zindex++;
  
      } else {
        // no cards in view
        $("div.cards")
          .addClass("showing");
        $(this)
          .css({zIndex:zindex})
          .addClass("show");
  
        zindex++;
      }
      
    });
  });







////////////////////////////
// this function can stay the same even when we
// are connecting to real API
function getAndDisplayGameEvents() {
    console.log("get display");
    getGameEvents(displayGameEvents);
}

//  on page load do this
$(function() {
   getAndDisplayGameEvents();
//  enableGoToLogin();
});

$("#read").on('click', function (event) {
    console.log("reading");

    event.preventDefault();
    getAndDisplayGameEvents();

});