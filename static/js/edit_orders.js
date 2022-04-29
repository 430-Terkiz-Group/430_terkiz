var SERVER_URL = "http://127.0.0.1:5000"
let user_list = []
var select = document.getElementById("all_staff");
var select1 = document.getElementById("all_staff1");
var newOption;
var newOption1;
function get_all_orders() {
    fetch(`${SERVER_URL}/all_order`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                newOption = document.createElement("option");
                newOption.value = str(data[x]["user_id"]+str(data[x]["order_id"]));
                newOption.text = data[x]["order_d"];
                newOption1 = document.createElement("option");
                newOption1.value = data[x]["order_id"];
                newOption1.text = data[x]["order_id"];
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
get_all_orders()

function view_order() {

    fetch(`${SERVER_URL}/all_order`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["username"] == document.getElementById("all_staff").value){
                document.getElementById("id").innerHTML = data[x]["order_id"]
                document.getElementById("username").innerHTML = data[x]["item_id"]
                document.getElementById("mail").innerHTML = data[x]["order_date"]
                document.getElementById("dob").innerHTML = data[x]["amount"]
                document.getElementById("date_joined").innerHTML = data[x]["user_id"]
            }
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
view_order()

function del_view_order() {

    fetch(`${SERVER_URL}/all_order`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["username"] == document.getElementById("all_staff1").value){
                    document.getElementById("id1").innerHTML = data[x]["order_id"]
                    document.getElementById("username1").innerHTML = data[x]["item_id"]
                    document.getElementById("mail1").innerHTML = data[x]["order_date"]
                    document.getElementById("dob1").innerHTML = data[x]["amount"]
                    document.getElementById("date_joined1").innerHTML = data[x]["user_id"]
            }
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
del_view_order()

function edit_order() {
    var order_id = document.getElementById("all_staff").value
    var field = document.getElementById("field").value
    var value = document.getElementById("value").value
    var data = { "order_id": order_id, "field": field, "value": value }
    fetch(`${SERVER_URL}/edit_order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Edit failed!") }
            else { alert("The order was changed successfully"); location.reload() }
        })
}
function delete_order() {
    var order_id = document.getElementById("all_staff1").value
    var data = { "order_id": order_id }
    fetch(`${SERVER_URL}/delete_order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Delete failed!") }
            else { alert("The order was deleted successfully"); location.reload() }
        })
}

function add_order() {
    var user_id = document.getElementById("user_id").value
    var order_date = document.getElementById("order_date").value
    var amount = document.getElementById("amount").value
    var item_id = document.getElementById("item_id").value
    if (!user_id || !order_date || !amount || !email || !item_id) {
        alert("Please fill all the fields")
    } else {
        var data = { "user_id": user_id, "order_date": order_date, "amount": amount, "item_id": item_id}
        fetch(`${SERVER_URL}/add_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) { alert("Failed!") }
                else { alert("Order successfully added!"); location.reload(); }
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