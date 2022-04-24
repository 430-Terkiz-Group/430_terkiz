var SERVER_URL = "http://127.0.0.1:5000"
let item_list = []
var select = document.getElementById("all_items");
var select1 = document.getElementById("all_items1");
var newOption;
var newOption1;
function get_all_items() {
    fetch(`${SERVER_URL}/all_item`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            for (x in data) {
                newOption = document.createElement("option");
                newOption.value = data[x]["name"];
                newOption.text = data[x]["name"];
                newOption1 = document.createElement("option");
                newOption1.value = data[x]["name"];
                newOption1.text = data[x]["name"];
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
get_all_items()

function view_items() {

    fetch(`${SERVER_URL}/all_item`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["name"] == document.getElementById("all_items").value){
                document.getElementById("name").innerHTML = data[x]["name"]
                document.getElementById("price").innerHTML = data[x]["price"]
                document.getElementById("stockleft").innerHTML = data[x]["stockleft"]
                document.getElementById("kind").innerHTML = data[x]["kind"]
                document.getElementById("sale").innerHTML = data[x]["sale"]
                document.getElementById("size").innerHTML = data[x]["size"]
            }
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
view_items()

function del_view_items() {

    fetch(`${SERVER_URL}/all_item`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for (x in data){
                if(data[x]["name"] == document.getElementById("all_items1").value){
                document.getElementById("id1").innerHTML = data[x]["id"]
                document.getElementById("name1").innerHTML = data[x]["name"]
                document.getElementById("price1").innerHTML = data[x]["price"]
                document.getElementById("stockleft1").innerHTML = data[x]["stockleft"]
                document.getElementById("kind1").innerHTML = data[x]["kind"]
                document.getElementById("sale1").innerHTML = data[x]["sale"]
                document.getElementById("size1").innerHTML = data[x]["size"]}
        }})
        .catch(error => {
            console.error('Error:', error);
        });
}
del_view_items()

function edit_item() {
    var name = document.getElementById("all_items").value
    var field = document.getElementById("field").value
    var value = document.getElementById("value").value
    var data = { "name": name, "field": field, "value": value }
    fetch(`${SERVER_URL}/edit_item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) { alert("Edit failed!") }
            else { alert("The item was changed successfully"); location.reload() }
        })
}
function delete_item() {
    var name = document.getElementById("all_items1").value
    var data = { "name": name }
    fetch(`${SERVER_URL}/delete_item`, {
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

function add_item() {
    var itname = document.getElementById("itemname_input").value
    var pri = document.getElementById("itemprice_input").value
    var stk = document.getElementById("stockleft_input").value
    var knd = document.getElementById("itemkind_input").value
    var sal = document.getElementById("itemsale_input").value
    var sz = document.getElementById("itemsize_input").value
    if (!itname || !pri || !stk || !knd || !sal || !sz ) {
        alert("Please fill all the fields")
    }  else {
        var data = { "name": itname, "price": pri, "stockleft": stk, "kind": knd, "sale": sal, "size": sz }
        fetch(`${SERVER_URL}/add_item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) { alert("Failed!") }
                else { alert("Item successfully added!"); location.reload(); }
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