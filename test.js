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

    xhttp.open("GET", "https://codecyprus.org/th/api/leaderboard?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&sorted&limit=10", true);
    xhttp.send();
}

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
            document.cookie = object.treasureHunts[0].uuid;
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
                document.cookie = object.session;
                window.location.href = "questions.html";
            }
        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/start?player=" + uName + "&app=" + appName + "&treasure-hunt-id=" + document.cookie, true);
    xhttp.send();
}

function question() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            console.log(object);
            var qText = document.getElementById("questionText");
            qText.innerHTML = "<p id='qText'>" + object.questionText + "</p>";

            if(object.questionType === "MCQ"){
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "A<input type='radio' name='ans' value='A'>" +
                    "B<input type='radio' name='ans' value='B'>" +
                    "C<input type='radio' name='ans' value='C'>" +
                    "D<input type='radio' name='ans' value='D'>" +
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='mcqAnswer()'>" +
                    "</form>";
            }

            else if(object.questionType === "TEXT"){
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                "Your Answer: <input class='ansElement' type='text' name='ans' title='Text goes here...'>"+
                "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>"
            }

            else if(object.questionType === "INTEGER"){
                let qDiv = document.getElementById("questionType");
                qDiv.innerHTML = "<form class='ansForm'>" +
                    "Your Answer: <input class='ansElement' type='number' name='ans'>"+
                    "<input class='ansButton' type='button' name='answer' value='submit' onclick ='textAnswer()'>"
            }

        }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + document.cookie, true);
    xhttp.send();
}

function textAnswer() {
    var ansForm = document.getElementsByClassName("ansElement");
    var ans = ansForm[0].value;
    console.log(ans);
    if (ansForm[0].value === undefined)
        alert("Type an answer");
    else{
        answer(ans);
    }

}

function mcqAnswer() {
    //Get answer from The user
    var ansForm = document.getElementsByClassName("ansForm");
    for(let i = 0; i < ansForm[0].length; i++){
        if(ansForm[0].elements[i].checked)
            var ans = ansForm[0].elements[i].value;
    }
    console.log(ans);
    answer(ans);

}


function answer(ans) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            console.log(object.correct);
            if(object.correct === true)
                location.reload();
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/answer?session=" + document.cookie + "&answer=" + ans, true);
    xhttp.send();
}

//If cookie exists then direct to questions (still in development)
function checkSession() {
    if (document.cookie !== "")
        window.location.href = "questions.html";




}
