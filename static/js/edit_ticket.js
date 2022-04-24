var SERVER_URL = "http://127.0.0.1:5000"
let ticket_list = []
var select = document.getElementById("all_tickets");
var select1 = document.getElementById("all_tickets1");
var newOption;
var newOption1;
function get_all_tickets() {
    fetch(`${SERVER_URL}/all_tickets`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                newOption = document.createElement("option");
                newOption.value = data[x]["match"];
                newOption.text = data[x]["match"];
                newOption1 = document.createElement("option");
                newOption1.value = data[x]["match"];
                newOption1.text = data[x]["match"];
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
get_all_tickets()

function view_tickets() {

    fetch(`${SERVER_URL}/all_tickets`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["match"] == document.getElementById("all_tickets").value){
                document.getElementById("price").innerHTML = data[x]["price"]
                document.getElementById("ticketsleft").innerHTML = data[x]["ticketsleft"]
                document.getElementById("sector").innerHTML = data[x]["sector"]
                document.getElementById("match").innerHTML = data[x]["match"]
                document.getElementById("competition").innerHTML = data[x]["competition"]
                document.getElementById("date").innerHTML = data[x]["date"]
                document.getElementById("passed").innerHTML = data[x]["passed"]
            }
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
view_tickets()

function del_view_tickets() {

    fetch(`${SERVER_URL}/all_tickets`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["match"] == document.getElementById("all_tickets1").value){
                document.getElementById("id1").innerHTML = data[x]["id"]
                document.getElementById("price1").innerHTML = data[x]["price"]
                document.getElementById("ticketsleft1").innerHTML = data[x]["ticketsleft"]
                document.getElementById("sector1").innerHTML = data[x]["sector"]
                document.getElementById("match1").innerHTML = data[x]["match"]
                document.getElementById("competition1").innerHTML = data[x]["competition"]
                document.getElementById("date1").innerHTML = data[x]["date"]
                document.getElementById("passed1").innerHTML = data[x]["passed"]}
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
del_view_tickets()

function edit_ticket() {
    var match = document.getElementById("all_tickets").value
    var field = document.getElementById("field").value
    var value = document.getElementById("value").value
    var data = { "match": match, "field": field, "value": value }
    fetch(`${SERVER_URL}/edit_tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Edit failed!") }
            else { alert("The ticket was changed successfully"); location.reload() }
        })
}
function delete_ticket() {
    var match = document.getElementById("all_tickets1").value
    var data = { "match": match }
    fetch(`${SERVER_URL}/delete_ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Delete failed!") }
            else { alert("The item was deleted successfully"); location.reload() }
        })
}

function add_ticket() {
    var pri = document.getElementById("price_input").value
    var tl = document.getElementById("ticketsleft_input").value
    var sec = document.getElementById("sector_input").value
    var mtch = document.getElementById("match_input").value
    var comp = document.getElementById("competition_input").value
    var dt = document.getElementById("date_input").value
    var psd = document.getElementById("passed_input").value
    if (!pri || !tl || !sec || !mtch || !comp || !dt || !psd ) {
        alert("Please fill all the fields")
    }  else {
        var data = {"price": pri, "ticketsleft": tl, "sector": sec, "match": mtch, "competition": comp, "date": dt, "passed": psd}
        fetch(`${SERVER_URL}/add_ticket`, { method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) { alert("Failed!") }
                else { alert("Ticket successfully added!"); location.reload(); }
            })
    }

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