var username=document.getElementById("username");

var mail=document.getElementById("mail");

var dob=document.getElementById("dob-type");

var id=document.getElementById("id");

var date_joined=document.getElementById("date_joined");

var gender=document.getElementById("gender");

var SERVER_URL = "http://127.0.0.1:5000"

    function view_user(){
        fetch(`${SERVER_URL}/view_info`)
        .then(response => response.json())
        .then(data => {
          document.getElementById("username").innerHTML=data["username"]
          document.getElementById("mail").innerHTML=data["mail"]
          document.getElementById("dob").innerHTML=data["dob"]
          document.getElementById("id").innerHTML=data["id"]
          document.getElementById("date_joined").innerHTML=data["date_joined"]
          document.getElementById("gender").innerHTML=data["gender"]
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
view_user();


