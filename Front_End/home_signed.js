function log_out(){
    localStorage.removeItem("TOKEN");
    window.location.replace("Home.html")
    alert("Logout Successful!")
}