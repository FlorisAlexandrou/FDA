// function sample() {
//     var numOfThs = document.getElementById("listTestingNumber").value;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             //TODO If response received (success).
//         }
//         else {
//             //TODO If response not received (error).
//         }
//     };
//     xhttp.open("GET", "https://codecyprus.org/th/test-api/list?number-of-ths=" + numOfThs, true);
//     xhttp.send();
// }


function listTest() {
    var numOfThs = document.getElementById("listTestingNumber").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            var object = JSON.parse(this.responseText);
            console.log(object);
            var listTestingDisplay = document.getElementById("listTestingDisplay");
            listTestingDisplay.innerHTML = "";
            for (let i = 0; i < object.treasureHunts.length; i++) {

                listTestingDisplay.innerHTML += "<p>" + (i + 1) + ". " + JSON.stringify(object.treasureHunts[i], null, 4) + "<p/>";

            }
        }

        // }
        else {
            //TODO If response not received (error).
        }
    };

    xhttp.open("GET", "https://codecyprus.org/th/test-api/list?number-of-ths=" + numOfThs, true);
    xhttp.send();
}

//Functions that clears divs' text by id.
function clearDisplays(displayID) {
    var listTesting = document.getElementById(displayID);
    listTesting.innerHTML = "Display cleared :)";
}

function startTest() {
    var sTestList = document.getElementById("startTestParameters");
    var sTestParams = sTestList.options[sTestList.selectedIndex].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            var object = JSON.parse(this.responseText);
            var startTestingDisplay = document.getElementById("startTestingDisplay");
            startTestingDisplay.innerHTML = "";
            startTestingDisplay.innerHTML = JSON.stringify(object, null, 4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/start?player=" + sTestParams, true);
    xhttp.send();
}

function questionTest() {
    var thCompleted = false;
    var canBeSkipped = false;
    var requiresLocation = false;
    var qTestList = document.getElementById("questionTestParameters");
    var qType = qTestList.options[qTestList.selectedIndex].value;
    if (document.getElementById("qthCompleted").checked === true)
        thCompleted = true;
    if (document.getElementById("canBeSkipped").checked === true)
        canBeSkipped = true;
    if (document.getElementById("requiresLocation").checked === true)
        requiresLocation = true;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            var object = JSON.parse(this.responseText);
            var questionTestingDisplay = document.getElementById("questionTestingDisplay");
            questionTestingDisplay.innerHTML = "";
            questionTestingDisplay.innerHTML = JSON.stringify(object, null, 4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/question?" +
        "completed=" + thCompleted +
        "&question-type=" + qType +
        "&can-be-skipped=" + canBeSkipped +
        "&requires-location=" + requiresLocation, true);
    xhttp.send();
}

function answerTest() {
    var correct = false;
    var thCompleted = false;
    if (document.getElementById("correct").checked === true)
        correct = true;
    if (document.getElementById("athCompleted").checked === true)
        thCompleted = true;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            var object = JSON.parse(this.responseText);
            var questionTestingDisplay = document.getElementById("answerTestingDisplay");
            questionTestingDisplay.innerHTML = "";
            questionTestingDisplay.innerHTML = JSON.stringify(object, null, 4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/answer?" +
        "correct=" + correct +
        "&completed=" + thCompleted, true);
    xhttp.send();
}

function scoreTest() {
    var thCompleted = false;
    var thFinished = false;
    var errorParam = false;
    if (document.getElementById("sthCompleted").checked === true)
        thCompleted = true;
    if (document.getElementById("thFinished").checked === true)
        thFinished = true;
    if (document.getElementById("errorParam").checked === true)
        errorParam = true;
    var scoreNumber = document.getElementById("scoreNumber").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var object = JSON.parse(this.responseText);
            var scoreTestingDisplay = document.getElementById("scoreTestingDisplay");
            scoreTestingDisplay.innerHTML = "";
            scoreTestingDisplay.innerHTML = JSON.stringify(object, null, 4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/score?" +
        "score=" + scoreNumber +
        "&completed=" + thCompleted +
        "&finished=" + thFinished +
        "&error=" + errorParam, true);
    xhttp.send();
}

function leaderboardTest() {
    var sortedTest = false;
    if (document.getElementById("sortedTest").checked === true)
        sortedTest = true;
    var sizeNumber = document.getElementById("sizeNumber").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var object = JSON.parse(this.responseText);
            var scoreTestingDisplay = document.getElementById("leaderboardTestingDisplay");
            scoreTestingDisplay.innerHTML = "";
            scoreTestingDisplay.innerHTML = JSON.stringify(object, null, 4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/leaderboard?" +
        "sorted=" + sortedTest +
        "&size=" + sizeNumber, true);
    xhttp.send();
}
