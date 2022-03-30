
var sign_up_btn = document.getElementById("signup_btn")
if (sign_up_btn){sign_up_btn.addEventListener("click",create_user());}
const SERVER_URL =  "http://127.0.0.1:5000"
function create_user(){
    var usn = document.getElementById("username_input").value
    var pwd = document.getElementById("password_input").value
    var repwd = document.getElementById("re_password_input").value
    var email = document.getElementById("email_input").value
    var dob = document.getElementById("dob_input").value
    var tos = document.getElementById("tos_input").value
    if (!usn || !pwd || !repwd || !email || !dob || !tos ){
        alert("Please fill all the fields")
    }
    else if (pwd!=repwd){
        alert("Please make sure your paswword and confirmed password match")
    }
    else{
    var data = {"username":usn,"password":pwd,"mail":email,"dob":dob,"gender":"male"}
    fetch(`${SERVER_URL}/add_user`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
                        if (!response.ok){alert("Username already in use!")}
                        else{alert("Sign up Successful!")}})
    document.getElementById("username_input").value="";
    document.getElementById("password_input").value=""
    document.getElementById("re_password_input").value=""
    document.getElementById("email_input").value=""
    document.getElementById("dob_input").value=""
    document.getElementById("tos_input").value=""
}

}