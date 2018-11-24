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
        start(uName.value,appName.value);
    };
}

function start(uName,appName){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            object = JSON.parse(this.responseText);
            document.cookie = object.session;
            location.href = "questions.html";
        }
        else{
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/api/start?player=" + uName + "&app=" + appName +"&treasure-hunt-id=" + document.cookie, true);
    xhttp.send();
}
