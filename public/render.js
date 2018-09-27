//const datePicker = require('jquery-datepicker');
//renderEditGame.use(datePicker);
/////////////////////  RENDERING HTML


function renderIntro() {
    let toRender = `
    <img src="images/img1.svg">
<h1 class="redColor center fontPermMarker">LET'S ROLL</h1>
<h3 class="blueColor center fontJosefinSans">TABLETOP SCHEDULER</h3>
<p>Play more board games (or anything else) with Let's Roll tabletop scheduler! The app is still in
    production but when complete you will be able to user a game session as well as sign up to attend other
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
                <label for="username">User Name</label>
                <input type="text" id="username" name="username" placeholder="Enter your username here" required><br />
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
    <button id="userAGameBtn">User A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    <h1>Welcome!</h1>
            <button id="viewGamesBtn" class="dashButton orange">View Games ></button>
            <!-- img tbd -->
       
            <!-- img tbd -->
            <button id="userAGameBtn" class="dashButton blue">User a Game ></button>
    `;
    $('#main').html(toRender);
}

/*maybe add instead of in renderView and renderUser, etc
function renderNavigation() {
    let toRender = `
    <a href="#" id="renderDashboardBtn">DASHBOARD</a> | <a href="#" id="userAGameBtn">User A Game</a> | <a href="#" id="viewGamesBtn">View Games</a>
    `;
    $('#nav').html(toRender);
}*/

function renderViewGames() {
    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation">
    <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->

    <button id="userAGameBtn">User A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>View Games</h1>
        <div class="cards">
        </div>
    `;
    $('#main').html(toRender);
}

function renderUserAGame() {
    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation" id="nav"> <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->
    <button id="userAGameBtn">User A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>Create Your Game</h1>
        <form id="js-create-form" role="create">
            <fieldset>
                <legend>User a Game</legend>

                <label for="gameTitle">Game Title</label>
                <input type="text" id="gameTitle" name="gameTitle" placeholder="Monopoly" required>
                <label for="maxPlayers">Maximum Players</label>
                <input type="number" id="maxPlayers" name="maxPlayers" placeholder="6" required>
                <br />

                <label for="address">Address</label>
                <input type="address" id="address" name="address" placeholder="123 Main St" required>
                <br />

                <label for="gameDatetime">Date & Time</label>
                <input type="datetime-local" id="gameDatetime" name="gameDatetime" required />

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
    const date = new Date(game.gameDatetime);
    const year = date.getFullYear();
    let month = date.getMonth();
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;


    let toRender = `
    <div id="dashTop" class="fontPermMarker">LET'S ROLL!</div>
    <nav role="navigation" id="nav"> <!-- a href="#" id="renderDashboardBtn">DASHBOARD</a> | -->
    <button id="userAGameBtn">User A Game</button> | <button id="viewGamesBtn">View Games</button> | <button id="logoutBtn">LOGOUT</button>
    </nav>
        <h1>Edit Your Game</h1>
        <form id="js-edit-form" role="create" data-game-id="${game.id}">
            <fieldset>
                <legend>Edit Your Game</legend>

                <label for="gameTitle">Game Title</label>
                <input type="text" id="gameTitle" name="gameTitle" value="${game.gameTitle}" required>
                <label for="maxPlayers">Maximum Players</label>
                <input type="number" id="maxPlayers" name="maxPlayers" value="${game.maxPlayers}" required>
                <br />

             <!--   <label for="username">User Name</label>
                <input type="text" id="username" name="username" value="${game.user}" required>
                <br />
            -->

                <label for="address">Address</label>
                <input type="address" id="address" name="address" value="${game.address}" placeholder="123 Main St" required>
                <br />

                <label for="gameDatetime">Date & Time</label>
                <input type="datetime-local" id="gameDatetime" name="gameDatetime" value="${formattedDate}" required />

                <input type="textarea" id="gameInfo" name="gameInfo" value="${game.gameInfo}">
                <br />

                <button type="submit" id="saveEditGameBtn" class="button">Save Game ></button>
            </fieldset>
        </form>
    `;
    $('#main').html(toRender);
}