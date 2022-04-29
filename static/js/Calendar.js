const SERVER_URL = "http://127.0.0.1:5000";
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


function loadTableData() {
    var events = new Array();
    events.push(["Id", "Title" ,"Event Type","Description","Time begin","Time end"]);
    var table = document.createElement("TABLE");
    table.classList.add('nicetable')
    table.border = "1";
    var columnCount = events[0].length
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.classList.add("cartheader");
        headerCell.innerHTML = events[0][i];
        row.appendChild(headerCell);
    }  
    fetch(`${SERVER_URL}/all_events`, { method: 'GET' })
.then(response => response.json())
.then(data => {
    for (x in data) {
        console.log(data[x]["title"])
        row = table.insertRow(-1);
        row.classList.add("cartrows");
        var arr = [data[x]["id"].toString(),data[x]["title"],data[x]["event_type"],data[x]["description"],data[x]["time_begin"],data[x]["time_end"]]
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            
            cell.innerHTML = arr[j];
        }
    }})
    var dvTable = document.getElementById("carts_table");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
        }


