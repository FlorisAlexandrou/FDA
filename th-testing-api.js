function listTest() {
    var numOfThs = document.getElementById("listTestingNumber").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //TODO If response received (success).
            var object = JSON.parse(this.responseText);
            console.log(object);
            var listTesting = document.getElementById("listTesting");
            listTesting.innerHTML = "";
            for (let i = 0; i < object.treasureHunts.length; i++) {

                listTesting.innerHTML += "<p>" + (i + 1) + ". " + JSON.stringify(object.treasureHunts[i], null , 4) + "<p/>";

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

function clearList() {
    var listTesting = document.getElementById("listTesting");
    listTesting.innerHTML = "Response will appear here :)";
}