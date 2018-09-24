//const datePicker = require('jquery-datepicker');
//renderEditGame.use(datePicker);
/////////////////////  RENDERING HTML


function renderIntro() {
    let toRender = `
    <img src="images/img1.svg">
<h1 class="redColor center fontPermMarker">LET'S ROLL</h1>
<h3 class="blueColor center fontJosefinSans">TABLETOP SCHEDULER</h3>
<p>Play more board games (or anything else) with Let's Roll tabletop scheduler! The app is still in
    production but when complete you will be able to host a game session as well as sign up to attend other
    users games, add comments, and connect to the board game geek api to grab more info on the games you
    would like to play.</p>
<p>
    <button class="homebuttons" id="goToLoginBtn">LOG IN ></button>
    &nbsp;&nbsp;<span class="blueColor btnslash">|</span>
    &nbsp;&nbsp;
    <button class="homebuttons" id="goToSignupBtn">SIGN UP ></button>
</p>`;
    $('#main').html(toRender);
}



function renderLogin() {
    let toRender = `
    <h1>Log In</h1>
        <form id="js-login-form" role="login">
            <fieldset>
                <legend>Log In</legend>
                <label for="username">User Name</label>
                <input type="text" id="username" name="username" placeholder="Enter your username here" required><br />
                <label for="password">Password</label>
                <input type="text" id="password" name="password" placeholder="Enter your password here" required><br />
                <button type="submit" id="logInBtn" class="button">Log In</button>
            </fieldset>
        </form>
        <p><a id="goToSignupBtn" href="#">Or Sign Up Here</a></p>
    `;
    $('#main').html(toRender);
}



function renderSignup() {
    let toRender = `
    <h1>Sign Up</h1>
        <form id="js-signup-form" role="signup">
            <fieldset>
                <legend>Sign Up</legend>
                <label for="userName">User Name</label>
                <input type="text" id="userName" name="userName" placeholder="Enter your username here" required><br />
                <label for="password">Password</label>
                <input type="text" id="password" name="password" placeholder="Enter your password here" required><br />
                <button type="submit" id="submitSignUpUserBtn" class="button">Sign Up ></button>
            </fieldset>
        </form>
        <p><a id="goToLoginBtn" href="#">Or Log in Here</a></p>
    `;
    $('#main').html(toRender);
}



function renderDashboard() {
    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <button id="hostAGameBtn">Host A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    <h1>Welcome!</h1>
            <button id="viewGamesBtn" class="dashButton orange">View Games ></button>
            <!-- img tbd -->
       
            <!-- img tbd -->
            <button id="hostAGameBtn" class="dashButton blue">Host a Game ></button>
    `;
    $('#main').html(toRender);
}

/*maybe add instead of in renderView and renderHost, etc
function renderNavigation() {
    let toRender = `
    <a href="#" id="renderDashboardBtn">DASHBOARD</a> | <a href="#" id="hostAGameBtn">Host A Game</a> | <a href="#" id="viewGamesBtn">View Games</a>
    `;
    $('#nav').html(toRender);
}*/

function renderViewGames() {
    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation">
    <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->

    <button id="hostAGameBtn">Host A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>View Games</h1>
        <div class="cards">
        </div>
    `;
    $('#main').html(toRender);
}

function renderHostAGame() {
    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation" id="nav"> <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->
    <button id="hostAGameBtn">Host A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>Create Your Game</h1>
        <form id="js-create-form" role="create">
            <fieldset>
                <legend>Host a Game</legend>

                <label for="gameTitle">Game Title</label>
                <input type="text" id="gameTitle" name="gameTitle" placeholder="Monopoly" required>
                <label for="maxPlayers">Maximum Players</label>
                <input type="number" id="maxPlayers" name="maxPlayers" placeholder="6" required>
                <br />

                <label for="username">Host Name</label>
                <input type="text" id="username" name="username" placeholder="John Doe" required>
                <br />

                <label for="street">Street</label>
                <input type="street" id="street" name="street" placeholder="123 Main St" required>
                <br />

                <label for="city">City</label>
                <input type="city" id="city" name="city" placeholder="Phoenix" required>

                <label for="state">State</label>
                <select id="state" name="state">
                    <option>AL</option>
                    <option>AZ</option>
                    <option>CA</option>
                </select>

                <label for="zipCode">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" pattern="[0-9]{5}" placeholder="55555" required>
                <br />


                <label for="gameDate">Date</label>
                <input type="date" id="gameDate" name="gameDate" placeholder="" required>

                <label for="gameTime">Time</label>
                <input type="time" id="gameTime" name="gameTime" placeholder="" required>
                <br />

                <label for="gameInfo">Additional Info</label>
                <input type="textarea" id="gameInfo" name="gameInfo" placeholder="Description of event or additional details about what to bring or whether food will be provided">
                <br />


                <button type="submit" id="createBtn" class="button">Create Game</button>
            </fieldset>
        </form>
    `;
    $('#main').html(toRender);
}

function renderEditGame(game) {
    //debugger;
    //let currentDate = game.gameDate;
    //var day = ("0" + currentDate.getDate()).slice(-2);
    //var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    //var today = currentDate.getFullYear()+"-"+(month)+"-"+(day) ;
    //$('#datePicker').val(today);
    /////////////////////
    //var gameDate1 = parseInt(this.gameDate);
    //var gameDate2 = new Date(gameDate1);
    //var date = gameDate2.getDate();
    //var month = gameDate2.getMonth(); //Be careful! January is 0 not 1
    //var year = gameDate2.getFullYear();
    //var currentDate = game.gameDate;
    var currentDate = new Date(game.gameDate);
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    if (month <= 9) {
        month = 0 + month
    };

    var day = currentDate.getDate();
    var dateInput = year + "-" + month + "-" + day;
    console.log(dateInput);
    //var dateInput = 20 + year + "-" + month + "-" + date;
    //    dateInput.toString();
    //  console.log(dateInput);
    //  var dateString = date + "-" + (month + 1) + "-" + year;
    //  var timestamp = gameDate2.getTime();
    //HH:MM
    //get first 10 of date time local?
    //jqueryDatepicker($);
    //$('#gameDate').datePicker({
    //    dateFormat: "yy-mm-dd"
    //});

    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation" id="nav"> <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->
    <button id="hostAGameBtn">Host A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>Edit Your Game</h1>
        <form id="js-edit-form" role="create">
            <fieldset>
                <legend>Edit Your Game</legend>

                <label for="gameTitle">Game Title</label>
                <input type="text" id="gameTitle" name="gameTitle" value="${game.gameTitle}" required>
                <label for="maxPlayers">Maximum Players</label>
                <input type="number" id="maxPlayers" name="maxPlayers" value="${game.maxPlayers}" required>
                <br />

                <label for="username">Host Name</label>
                <input type="text" id="username" name="username" value="${game.host}" required>
                <br />

                <label for="street">Street</label>
                <input type="street" id="street" name="street" placeholder="123 Main St" required>
                <br />

                <label for="city">City</label>
                <input type="city" id="city" name="city" placeholder="Phoenix" required>

                <label for="state">State</label>
                <select id="state" name="state">
                    <option>AL</option>
                    <option>AZ</option>
                    <option>CA</option>
                </select>

                <label for="zipCode">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" pattern="[0-9]{5}" placeholder="55555" required>
                <br />


                <label for="gameDate">Date</label>
                <input id="gameDate" type="text" name="gameDate" value="${dateInput}" required>

                <label for="gameTime">Time</label>
                <input type="time" id="gameTime" name="gameTime" value="05:00" required>
                <br />

                <label for="gameInfo">Additional Info</label>
                <input type="textarea" id="gameInfo" name="gameInfo" value="${game.gameInfo}">
                <br />


                <button type="submit" id="saveEditGameBtn" class="button">Save Game ></button>
            </fieldset>
        </form>
    `;
    $('#main').html(toRender);
}