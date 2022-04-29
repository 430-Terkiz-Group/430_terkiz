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
                newOption.value = data[x]["order_id"];
                newOption.text = data[x]["order_id"];
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
                if(data[x]["order_id"] == document.getElementById("all_staff").value){
                document.getElementById("id").innerHTML = data[x]["order_id"]
                document.getElementById("username").innerHTML = data[x]["item_id"]
                document.getElementById("gender").innerHTML = data[x]["order_date"]
                document.getElementById("dob").innerHTML = data[x]["amount"]
                document.getElementById("mail").innerHTML = data[x]["user_id"]
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
                if(data[x]["order_id"] == document.getElementById("all_staff1").value){
                    document.getElementById("id1").innerHTML = data[x]["order_id"]
                    document.getElementById("username1").innerHTML = data[x]["item_id"]
                    document.getElementById("gender1").innerHTML = data[x]["order_date"]
                    document.getElementById("dob1").innerHTML = data[x]["amount"]
                    document.getElementById("mail1").innerHTML = data[x]["user_id"]
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
    var value;
    if (ItemIDIsSelected() || UserIDIsSelected())
        value = document.getElementById("itemUserID").value;
    else
        value = document.getElementById("value").value;




    var data = { "order_id": order_id, "field": field, "value": value }

    if (field == "amount" && (isNaN(parseInt(value)) || parseInt(value) < 0  )  ){
        alert("amount must be a positive integer!");
        return;
    }

    var string_date = value
    if(field == "order_date" && !DateIsValid(  string_date)){
        alert("please enter a valid date!");
        return;
    }





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
    var amount = document.getElementById("amount").value
    var item_id = document.getElementById("item_id").value
    if (!user_id || !amount || !item_id) {
        alert("Please fill all the fields")
    } else {
        var data = { "user_id": user_id, "amount": amount, "item_id": item_id}
        fetch(`${SERVER_URL}/admin_add_order`, {
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

function DateIsSelected(){
    return document.getElementById("field").value == "order_date";
} 

function AmountIsSelected(){
    return document.getElementById("field").value == "amount";
}

function ItemIDIsSelected(){
    return document.getElementById("field").value == "item_id";
}

function UserIDIsSelected(){
    return document.getElementById("field").value == "user_id";
}

function SetInputFieldType(){
    if (AmountIsSelected()){
        document.getElementById("itemUserID").style.visibility="hidden";
        document.getElementById("value").style.visibility= "visible";
        document.getElementById("value").setAttribute("type" , "text");
    }
    else if (DateIsSelected()){
        document.getElementById("itemUserID").style.visibility="hidden";
        document.getElementById("value").style.visibility= "visible";
        document.getElementById("value").setAttribute("type" , "date");
    }
    else if (ItemIDIsSelected()){
        document.getElementById("itemUserID").style.visibility="visible";
        get_all_itemID();
        document.getElementById("value").style.visibility= "hidden";
    }
    else if (UserIDIsSelected()){

        document.getElementById("itemUserID").style.visibility="visible";
        get_all_userID();
        document.getElementById("value").style.visibility= "hidden";
    }
}

//itemUserID
var select2 = document.getElementById("itemUserID");
var newOption2;
function get_all_userID() {
    fetch(`${SERVER_URL}/all_user`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            select2.options.length =0;

            for (x in data) {
                newOption2 = document.createElement("option");
                newOption2.value = data[x]["id"];
                newOption2.text = data[x]["id"];
                try {
                    select2.add(newOption2);
                }
                catch (e) {
                    select2.appendChild(newOption2);
                }
            }
        })
}

var select3 = document.getElementById("itemUserID");
var newOption3;
function get_all_itemID() {
    fetch(`${SERVER_URL}/all_item`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            select3.options.length =0;

            for (x in data) {
                newOption3 = document.createElement("option");
                newOption3.value = data[x]["id"];
                newOption3.text = data[x]["id"];
                try {
                    select3.add(newOption3);
                }
                catch (e) {
                    select3.appendChild(newOption3);
                }
            }
        })
}

function DateIsValid(string_dob){

    var dob = document.getElementById("value").value;
    year = string_dob.substring(0,4);
    string_dob = dob;
    month = string_dob.substring(5,7);
    string_dob = dob;
    day = string_dob.substring(8,10);

    if(parseInt(year)>2022){
        return false;
    }
    if(parseInt(year)==2022){
        if(parseInt(month)>4){
            return false
        }
        else if (parseInt(month)==4)
        {
            if(parseInt(day)>=29){
                return false
            }
        }
}
    return true;
}



checkStaff()
checkadmin()
SetInputFieldType()
