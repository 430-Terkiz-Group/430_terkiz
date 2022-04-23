var SERVER_URL = "http://127.0.0.1:5000"
let user_list = []
var select = document.getElementById("all_user");
var select1 = document.getElementById("all_user1");
var newOption;
var newOption1;
function get_all_users() {
    fetch(`${SERVER_URL}/all_user`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                newOption = document.createElement("option");
                newOption.value = data[x]["username"];
                newOption.text = data[x]["username"];
                newOption1 = document.createElement("option");
                newOption1.value = data[x]["username"];
                newOption1.text = data[x]["username"];
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
get_all_users()

function view_user() {

    fetch(`${SERVER_URL}/all_user`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["username"] == document.getElementById("all_user").value){
                document.getElementById("id").innerHTML = data[x]["id"]
                document.getElementById("username").innerHTML = data[x]["username"]
                document.getElementById("mail").innerHTML = data[x]["mail"]
                document.getElementById("dob").innerHTML = data[x]["dob"]
                document.getElementById("date_joined").innerHTML = data[x]["date_joined"]
                document.getElementById("gender").innerHTML = data[x]["gender"]}
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
view_user()

function del_view_user() {

    fetch(`${SERVER_URL}/all_user`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["username"] == document.getElementById("all_user1").value){
                document.getElementById("id1").innerHTML = data[x]["id"]
                document.getElementById("username1").innerHTML = data[x]["username"]
                document.getElementById("mail1").innerHTML = data[x]["mail"]
                document.getElementById("dob1").innerHTML = data[x]["dob"]
                document.getElementById("date_joined1").innerHTML = data[x]["date_joined"]
                document.getElementById("gender1").innerHTML = data[x]["gender"]}
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
del_view_user()

function edit_user() {
    var username = document.getElementById("all_user").value
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