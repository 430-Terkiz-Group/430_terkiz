const SERVER_URL = "http://127.0.0.1:5000";

function send_emails() {
        var recipients = document.getElementById("recipients").value.split(",")
        var subject = document.getElementById("subject").value
        var msg = document.getElementById("msg").value
        
        var data = { "recipients": recipients, 
        "subject": subject, 
        "body": msg }

        fetch(`${SERVER_URL}/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) { alert("Email sending failed!") }
                else { alert("The Email was sent successfully"); location.reload() }
            })
}

function view_staff(){
      
    fetch(`${SERVER_URL}/view_info_staff`,{method:'POST',headers: {
      'Content-Type': 'application/json'},body: JSON.stringify({"token":getUserToken()})}
)
    .then(response => response.json())
    .then(data => {
      document.getElementById("username").innerHTML=data["username"]
      document.getElementById("mail").innerHTML=data["mail"]
      document.getElementById("id").innerHTML=data["id"]
      document.getElementById("position").innerHTML=data["position"]
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
