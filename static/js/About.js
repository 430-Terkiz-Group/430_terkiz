var username=document.getElementById("username");
var gender=document.getElementById("gender");
var dob=document.getElementById("dob");

var id=document.getElementById("id");
var position = document.getElementById("position");
var date_joined=document.getElementById("date_joined");

var mail=document.getElementById("mail");
var phone = document.getElementById("phone");





var SERVER_URL = "http://127.0.0.1:5000"

    function view_staff(){
      
        fetch(`${SERVER_URL}/view_info_staff`,{method:'POST',headers: {
          'Content-Type': 'application/json'},body: JSON.stringify({"token":getUserToken()})}
  )
        .then(response => response.json())
        .then(data => {
          document.getElementById("username").innerHTML=data["username"]
          document.getElementById("mail").innerHTML=data["mail"]
          document.getElementById("dob").innerHTML=data["dob"]
          document.getElementById("id").innerHTML=data["id"]
          document.getElementById("date_joined").innerHTML=data["date_joined"]
          document.getElementById("gender").innerHTML=data["gender"]
          document.getElementById("position").innerHTML=data["position"]
          document.getElementById("phone").innerHTML=data["phone"]
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
view_staff();



function saveUserToken(userToken) {
  localStorage.setItem("TOKEN", userToken);
}
function getUserToken() {
  return localStorage.getItem("TOKEN");
}
function clearUserToken() {
  return localStorage.removeItem("TOKEN");
}
