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

                listTestingDisplay.innerHTML += "<p>" + (i + 1) + ". " + JSON.stringify(object.treasureHunts[i], null , 4) + "<p/>";

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
            startTestingDisplay.innerHTML = JSON.stringify(object,null,4);
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/test-api/start?player=" + sTestParams , true);
    xhttp.send();
}
