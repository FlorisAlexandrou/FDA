function list() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            for (let i = 0; i < object.treasureHunts.length; i++) {
                var treasureHuntsDiv = document.getElementById("treasureHunt");
                var treasureHunt = document.createElement("p");
                var thLink = document.createElement("a");
                thLink.innerHTML = (i + 1) + ". " + object.treasureHunts[i].name;
                thLink.href = "identity.html";
                treasureHunt.appendChild(thLink);
                treasureHuntsDiv.appendChild(treasureHunt);
            }
            document.cookie = "uuid=" + object.treasureHunts[0].uuid;
            console.log(getCookie("uuid"));
            console.log(document.cookie);

        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}

function submit() {
    document.getElementById("sbutton").onclick = function saveCredentials() {
        var uName = document.getElementById("username");
        var appName = document.getElementById("appname");
        start(uName.value, appName.value);
    };
}

function start(uName, appName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            object = JSON.parse(this.responseText);
            if (object.status === "ERROR") {
                alert(object.errorMessages);
            }
            else {
                document.cookie = "session=" + object.session;
                window.location.href = "questions.html";
            }
        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/start?player=" + uName + "&app=" + appName + "&treasure-hunt-id=" + getCookie("uuid"), true);
    xhttp.send();
}

function question() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            //If the questions are over send to leaderboard page.
            if (object.currentQuestionIndex === object.numOfQuestions){
                document.cookie = "session=" + getCookie("session") + "; expires=Thu, 01 Jan 2000 00:00:01 GMT";
                window.location.href = "leaderboard.html";
            }
            //Get location if needed
            if (object.requiresLocation === true)
                getLocation();
            console.log(object);
            var qText = document.getElementById("questionText");
            qText.innerHTML = "<p id='qText'>" + object.questionText + "</p>";



            if (object.questionType === "MCQ") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "A<input type='radio' name='ans' value='A'>" +
                    "B<input type='radio' name='ans' value='B'>" +
                    "C<input type='radio' name='ans' value='C'>" +
                    "D<input type='radio' name='ans' value='D'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='mcqAnswer()'>" +
                    "<input type='button' name='skip' value='skip' onclick ='canSkip()'>" +
                    "</form>";
            }

            else if (object.questionType === "TEXT") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='text' name='ans' placeholder='Answer here...'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" +
                    "<input type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";

            }

            else if (object.questionType === "INTEGER") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='number' step='number' name='ans' placeholder='Answer here...'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" +
                    "<input type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
            }

            else if (object.questionType === "BOOLEAN") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "true<input type='radio' name='ans' value='true'>" +
                    "false<input type='radio' name='ans' value='false'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='mcqAnswer()'>" +
                    "<input type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
            }

            else if (object.questionType === "NUMERIC") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='number' step='any' name='ans'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" +
                    "<input type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
            }

        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + getCookie("session"), true);
    xhttp.send();
}

//Handles text,number and numeric questions.
function textAnswer() {
    var ansForm = document.getElementsByClassName("ansElement");
    var ans = ansForm[0].value;
    console.log(ans);
    if (ansForm[0].value === "")
        alert("Type an answer");
    else {
        answer(ans);
    }

}

//Handles yes/no and multiple choice questions.
function mcqAnswer() {
    //Get answer from The user
    var ansForm = document.getElementsByClassName("ansForm");
    for (let i = 0; i < ansForm[0].length; i++) {
        if (ansForm[0].elements[i].checked)
            var ans = ansForm[0].elements[i].value;
    }
    console.log(ans);
    if (ans === undefined)
        alert("Choose an answer.");
    else
        answer(ans);

}


function answer(ans) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            console.log(object.correct);
            if (object.correct === true)
                location.reload();
            else {
                alert("Wrong, -3 points, Try again.");
                score();
            }
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/answer?session=" + getCookie("session") + "&answer=" + ans, true);
    xhttp.send();
}

//Shows the name of the player and their score.
function score() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            var scoreDiv = document.getElementById("score");
            scoreDiv.innerHTML = "<p>" + 'Player: ' + object.player + ' Score: ' + object.score + "</p>";
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/score?session=" + getCookie("session"), true);
    xhttp.send();
}

//Checks whether the question can be skipped.
function canSkip() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            if (object.canBeSkipped === true) {
                skipq()
            }
            else {
                alert("This question can not be skipped.")
            }
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + getCookie("session"), true);
    xhttp.send();
}

function skipq() {
    if (confirm('You will lose 5 points, are you sure you want to skip?')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                //TODO If response received (success).
                location.reload();
            }
            else {
                //TODO If response not received (error).
            }
        };
        xhttp.open("GET", "https://codecyprus.org/th/api/skip?session=" + getCookie("session"), true);
        xhttp.send();
    }
}

//Still a work in progress
function getLocation() {
    if (navigator.geolocation) {

        console.log(navigator.geolocation.getCurrentPosition(location));

      }

      function location(location){
          console.log(location.coords.longitude);
          console.log(location.coords.latitude);

    }
}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
        }
        else {
            //TODO If response not received (error).
        }
    };
    //TODO get actual location from mobile device.
    xhttp.open("GET", "https://codecyprus.org/th/api/location?session=" + getCookie("session") + "&latitude=35.00829" + "&longitude=33.697047", true);
    xhttp.send();

function leaderboard() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            console.log(object.leaderboard);
            for (let i = 0; i < object.numOfPlayers; i++) {
                var leaderboards = document.getElementById("lead");
                var leaderboardindex = document.createElement("p");
                leaderboardindex.innerHTML = "Position: " + (i + 1) + "<br>" + " Name: " + object.leaderboard[i].player + "<br>";
                leaderboardindex.innerHTML += " Score: " + object.leaderboard[i].score;
                leaderboards.appendChild(leaderboardindex);
            }

        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/leaderboard?treasure-hunt-id=" + getCookie("uuid") + "&sorted&limit=10", true);
    xhttp.send();
}

//If cookie exists then direct to questions (still in development)
function checkSession() {
    console.log(getCookie("session"));
    if (getCookie("session") !== undefined) {
        if (confirm('You left a game in progress! Do you want to resume?')) {
            window.location.href = "questions.html";
        }
        else {
            //Expire the session cookie.
            document.cookie = "session=" + getCookie("session") + "; expires=Thu, 01 Jan 2000 00:00:01 GMT";
        }
    }
}

//function to access the value of a specific cookie by name from stack overflow.
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
