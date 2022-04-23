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