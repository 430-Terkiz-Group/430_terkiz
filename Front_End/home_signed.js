function log_out(){
    localStorage.removeItem("TOKEN");
    window.location.replace("Home.html")
    alert("Logout Successful!")
}
function checkadmin(){
    fetch(`${SERVER_URL}/view_info_admin`,{method:'POST',headers: {
        'Content-Type': 'application/json'},body: JSON.stringify({"token":getUserToken()})}
)
        .then(response => {
            if (!response.ok) {
                return
            }
            else{
                document.getElementById("edit").style.visibility="visible";  
            }
        })

}
