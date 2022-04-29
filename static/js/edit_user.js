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
    if(field=="Date of Birth")
    {
        var string_dob = value;
        year = string_dob.substring(0,4);
        string_dob = dob;
        month = string_dob.substring(5,7);
        string_dob = dob;
        day = string_dob.substring(8,10);
        console.log(parseInt(year))
        console.log(parseInt(month))
        console.log(parseInt(day))
        if(parseInt(year)>2022){
            alert("Invalid Date of Birth")
            return
        }
        if(parseInt(year)==2022){
            if(parseInt(month)>4){
                alert("Invalid Date of Birth")
                return
            }
            else if (parseInt(month)==4)
            {
                if(parseInt(day)>=29){
                    alert("Invalid Date of Birth")
                    return
                }
            }
        }
    }
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
    var username = document.getElementById("all_user1").value
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

function checkStaff(){
    fetch(`${SERVER_URL}/check_staff`,{method:'POST',headers: {
        'Content-Type': 'application/json'},body: JSON.stringify({"token":localStorage.getItem("TOKEN")})}
)
.then(response => response.json())
    .then(data => {
        if (data["staffCheck"] == true){
            document.getElementById("ProfileIcon").setAttribute("data-href" , "About.html");
            document.getElementById("Account").setAttribute("href" , "About.html"); 
            document.getElementById("Account1").setAttribute("href" , "About.html"); 

        }
        else{
            document.getElementById("ProfileIcon").setAttribute("data-href" , "About_User.html");  
            document.getElementById("Account").setAttribute("href" , "About_User.html");
            document.getElementById("Account1").setAttribute("href" , "About_User.html");
        }
        console.log(data["staffCheck"]);
})       
}

function checkadmin(){
    fetch(`${SERVER_URL}/check_admin`,{method:'POST',headers: {
        'Content-Type': 'application/json'},body: JSON.stringify({"token":localStorage.getItem("TOKEN")})}
)
    .then(response => response.json())
        .then(data => {
            if (data["adminCheck"] == true){
                adminLoggedIn = true;   
                document.getElementById("edit").style.visibility="visible";  
            }
            else{
                adminLoggedIn = false;
                document.getElementById("edit").style.visibility="hidden";  
            }
        })
            
}
checkStaff()
checkadmin()