function leaderboard(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            object = JSON.parse(this.responseText);
            console.log(object.leaderboard);
           for (let i = 0; i < object.numOfPlayers; i++){
               var leaderboards =  document.getElementById("lead");
               var leaderboardindex = document.createElement("p");
               leaderboardindex.id = "name";
               leaderboardindex.innerHTML ="Position: " + (i+1) + "<br>" + " Name: " + object.leaderboard[i].player + "<br>";
               leaderboardindex.innerHTML +=" Score: " + object.leaderboard[i].score;
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

leaderboard();