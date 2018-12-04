const appName = "FDA";
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
                thLink.onclick = function setCookie() {
                    document.cookie = "uuid=" + object.treasureHunts[i].uuid
                };
                console.log(document.cookie);
                treasureHunt.appendChild(thLink);
                treasureHuntsDiv.appendChild(treasureHunt);
            }
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
        start(uName.value, appName.value);
    };
}

function start(uName) {
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
            if (object.requiresLocation === true){
                if(confirm("This questions requires Location, Do you wish to give your location?")){
                    getLocation();
                }
            }

            var qText = document.getElementById("questionText");
            qText.innerHTML = "<p id='qText'>" + object.questionText + "</p>";


            if (object.questionType === "MCQ") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "A<input class='radioButton' type='radio' name='ans' value='A'>" +
                    "B<input class='radioButton' type='radio' name='ans' value='B'>" +
                    "C<input class='radioButton' type='radio' name='ans' value='C'>" +
                    "D<input class='radioButton' type='radio' name='ans' value='D'>" + "<br>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='mcqAnswer()'>" +
                    "<input class='skipButton' type='button' name='skip' value='skip' onclick ='canSkip()'>" +
                    "</form>";
            }

            else if (object.questionType === "TEXT") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='text' name='ans' placeholder='Answer here...'>" + "<br>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" +
                    "<input class='skipButton' type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";

            }

            else if (object.questionType === "INTEGER") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='number' step='number' name='ans' placeholder='Answer here...'>" + "<br>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" +
                    "<input class='skipButton' type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
            }

            else if (object.questionType === "BOOLEAN") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "true<input class='radioButton' type='radio' name='ans' value='true'>" +
                    "false<input class='radioButton' type='radio' name='ans' value='false'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='mcqAnswer()'>" + "<br>" +
                    "<input class='skipButton' type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
            }

            else if (object.questionType === "NUMERIC") {
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='number' step='any' name='ans'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>" + "<br>" +
                    "<input class='skipButton' type='button' name='skip' value='skip' onclick ='canSkip()'>" + "</form>";
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

//Handles boolean and multiple choice questions.
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
            scoreDiv.innerHTML ="<p>" + 'Player: ' + object.player + "<br>" + ' Score: ' + object.score + "</p>";
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/score?session=" + getCookie("session"), true);
    xhttp.send();

    //Show current question number / last question number.
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            var currentQuestion = parseInt(object.currentQuestionIndex) + 1;
            var scoreDiv = document.getElementById("score");
            scoreDiv.innerHTML+= "Questions: " + currentQuestion + "/" + object.numOfQuestions;
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + getCookie("session"), true);
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

//Function that enables the user to skip the question.
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

//Get the location from the client.
function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
    function showPosition(position) {
        console.log("lat: " + position.coords.latitude);
        console.log("lng: " + position.coords.longitude);
        sendLocation(position.coords.latitude, position.coords.longitude);
    }
}

//Send the location to the server.
function sendLocation(latitude,longitude) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            console.log("location received!");
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/location?" +
        "session=" + getCookie("session") + "&latitude=" + latitude + "&longitude=" + longitude, true);
    xhttp.send();
}

//Show the leaderboard.
function leaderboard() {
    var numOfPlayersLimit = 10;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            for (let i = 0; i < numOfPlayersLimit; i++) {
                var leaderboards = document.getElementById("lead");
                var leaderboardindex = document.createElement("p");
                leaderboardindex.innerHTML = "Position: " + (i + 1) + "<br>" + " Name: " + object.leaderboard[i].player + "<br>";
                leaderboardindex.innerHTML += " Score: " + object.leaderboard[i].score + "<br>" +
                "- - - - - - - -";
                leaderboards.appendChild(leaderboardindex);
            }

        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/leaderboard?treasure-hunt-id=" + getCookie("uuid") + "&sorted&limit=" + numOfPlayersLimit, true);
    xhttp.send();
}

//If cookie exists then direct to questions.
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

//function to access the value of a specific cookie by name from stack overflow (URL: https://stackoverflow.com/questions/10730362/get-cookie-by-name).
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
