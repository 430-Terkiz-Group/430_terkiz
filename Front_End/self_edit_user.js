var SERVER_URL = "http://127.0.0.1:5000"
let user_list = []
var select = document.getElementById("all_user");
var select1 = document.getElementById("all_users");
var newOption;
var newOption1;

var username = document.getElementById("username");

var mail = document.getElementById("mail");

var dob = document.getElementById("dob-type");

var id = document.getElementById("id");

var date_joined = document.getElementById("date_joined");

var gender = document.getElementById("gender");

var SERVER_URL = "http://127.0.0.1:5000"

function view_user() {

    fetch(`${SERVER_URL}/view_info`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ "token": getUserToken() })
    }
    )
        .then(response => response.json())
        .then(data => {
            document.getElementById("username").innerHTML = data["username"]
            document.getElementById("mail").innerHTML = data["mail"]
            document.getElementById("dob").innerHTML = data["dob"]
            document.getElementById("id").innerHTML = data["id"]
            document.getElementById("date_joined").innerHTML = data["date_joined"]
            document.getElementById("gender").innerHTML = data["gender"]
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
view_user();

function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
}
function getUserToken() {
    return localStorage.getItem("TOKEN");
}
function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}

function edit_user() {
    var username = document.getElementById("username").innerHTML
    var field = document.getElementById("field").value
    var value = document.getElementById("value").value
    var data = { "username": username, "field": field, "value": value }
    fetch(`${SERVER_URL}/edit_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Edit failed!") }
            else { alert("The user was changed successfully"); location.reload() }
        })
}
function delete_user() {
    var check = document.getElementById("check_input").value
    if (!check) {
        alert("Please check field")
    }
    var username = document.getElementById("all_users").value
    var data = { "username": username }
    fetch(`${SERVER_URL}/delete_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Delete failed!") }
            else { alert("The user was deleted successfully"); location.reload() }
        })
}