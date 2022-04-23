const SERVER_URL = "http://127.0.0.1:5000";
var profileIcon = document.getElementById("ProfileIcon");
var adminLoggedIn = false;

function log_out(){
    localStorage.removeItem("TOKEN");
    window.location.replace("Home.html")
    alert("Logout Successful!")
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

function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
}
function getUserToken() {
    return localStorage.getItem("TOKEN");
}
function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}
//checkStaff();

