function renderIntro() {
    $('#intro').html(introHtml());
}

function introHtml() {
    return `
<img src="images/img1.svg">
<h1 class="redColor center fontPermMarker">LET'S ROLL</h1>
<h3 class="blueColor center fontJosefinSans">TABLETOP SCHEDULER</h3>
<p>Play more board games (or anything else) with Let's Roll tabletop scheduler! The app is still in
    production but when complete you will be able to host a game session as well as sign up to attend other
    users games, add comments, and connect to the board game geek api to grab more info on the games you
    would like to play.</p>
<p>
    <button class="homebuttons" id="loginBtn">LOG IN ></button>
    &nbsp;&nbsp;<span class="blueColor btnslash">|</span>
    &nbsp;&nbsp;
    <button class="homebuttons" id="signupBtn">SIGN UP ></button>
</p>`
}