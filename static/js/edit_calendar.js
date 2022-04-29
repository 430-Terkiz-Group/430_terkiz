var SERVER_URL = "http://127.0.0.1:5000"
let event_list = []
var select = document.getElementById("all_calendar");
var select1 = document.getElementById("all_calendar1");
var newOption;
var newOption1;
function get_all_calendar() {
    fetch(`${SERVER_URL}/all_calendar`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                newOption = document.createElement("option");
                console.log(data[x]["title"])
                newOption.value = data[x]["title"];
                newOption.text = data[x]["title"];
                newOption1 = document.createElement("option");
                newOption1.value = data[x]["title"];
                newOption1.text = data[x]["title"];
                try {
                    select.add(newOption);
                    select1.add(newOption1);
                }
                catch (e) {
                    select.appendChild(newOption);
                    select1.appendChild(newOption1);
                }
            }
        })
}
get_all_calendar()

function view_calendar() {

    fetch(`${SERVER_URL}/all_calendar`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                if (data[x]["title"] == document.getElementById("all_calendar").value) {
                    document.getElementById("title").innerHTML = data[x]["title"]
                    document.getElementById("event_type").innerHTML = data[x]["event_type"]
                    document.getElementById("description").innerHTML = data[x]["description"]
                    document.getElementById("time_begin").innerHTML = data[x]["time_begin"]
                    document.getElementById("time_end").innerHTML = data[x]["time_end"]
                    document.getElementById("last_modify").innerHTML = data[x]["last_modify"]
                    document.getElementById("privacy").innerHTML = data[x]["privacy"]

                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
view_calendar()

function del_view_calendar() {

    fetch(`${SERVER_URL}/all_calendar`, { method: 'GET' })     ////////////////////////////
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                if (data[x]["title"] == document.getElementById("all_calendar1").value) {
                    document.getElementById("event_id1").innerHTML = data[x]["event_id1"]
                    document.getElementById("title1").innerHTML = data[x]["title1"]
                    document.getElementById("event_type1").innerHTML = data[x]["event_type1"]
                    document.getElementById("description1").innerHTML = data[x]["description1"]
                    document.getElementById("time_begin1").innerHTML = data[x]["time_begin1"]
                    document.getElementById("time_end1").innerHTML = data[x]["time_end1"]
                    document.getElementById("last_modify1").innerHTML = data[x]["last_modify1"]
                    document.getElementById("privacy1").innerHTML = data[x]["privacy1"]
                }

            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
del_view_calendar()

function edit_calendar() {
    var title = document.getElementById("all_calendar").value
    var field = document.getElementById("field").value
    var value = document.getElementById("value").value

    var data = { "title": title, "field": field, "value": value }
    console.log(field)
    if (!title || !field || !value) {
        alert("Please fill all fields")
        return;
    }
    else {
        fetch(`${SERVER_URL}/edit_calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) { alert("Edit failed!") }
                else { alert("The event was changed successfully"); location.reload() }
            })
    }
}
function delete_calendar() {
    var title = document.getElementById("all_calendar1").value
    var data = { "title": title }
    fetch(`${SERVER_URL}/delete_calendar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Delete failed!") }
            else { alert("The event was deleted successfully"); location.reload() }
        })
}

/* Shrek will help you while writing your code
    ⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆ 
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿ 
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀ 
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
*/

function add_calendar() {
    var titl = document.getElementById("title_input").value
    var eve = document.getElementById("eventtype_input").value
    var desc = document.getElementById("description_input").value
    var tbgn = document.getElementById("timebegin_input").value
    var tend = document.getElementById("timeend_input").value
    var lmod = document.getElementById("lastmodify_input").value
    var priv = document.getElementById("privacy_input").value

    if (!titl || !eve || !desc || !tbgn || !lmod || !priv) {
        alert("Please fill all the fields")
        return;
    }

    if (priv == "Private") {
        priv = true
    }
    else {
        priv = false
    }


    var data = { "title": titl, "event_type": eve, "description": desc, "time_begin": tbgn, "time_end": tend, "last_modify": lmod, "privacy": priv }
    fetch(`${SERVER_URL}/add_calendar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Failed!") }
            else { alert("Event successfully added!"); location.reload(); }
        })


}

function checkStaff() {
    fetch(`${SERVER_URL}/check_staff`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ "token": localStorage.getItem("TOKEN") })
    }
    )
        .then(response => response.json())
        .then(data => {
            if (data["staffCheck"] == true) {
                document.getElementById("ProfileIcon").setAttribute("data-href", "About.html");
                document.getElementById("Account").setAttribute("href", "About.html");
                document.getElementById("Account1").setAttribute("href", "About.html");

            }
            else {
                document.getElementById("ProfileIcon").setAttribute("data-href", "About_User.html");
                document.getElementById("Account").setAttribute("href", "About_User.html");
                document.getElementById("Account1").setAttribute("href", "About_User.html");
            }
            console.log(data["staffCheck"]);
        })
}

function checkadmin() {
    fetch(`${SERVER_URL}/check_admin`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ "token": localStorage.getItem("TOKEN") })
    }
    )
        .then(response => response.json())
        .then(data => {
            if (data["adminCheck"] == true) {
                adminLoggedIn = true;
                document.getElementById("edit").style.visibility = "visible";
            }
            else {
                adminLoggedIn = false;
                document.getElementById("edit").style.visibility = "hidden";
            }
        })

}
checkStaff()
checkadmin()