const SERVER_URL = "http://127.0.0.1:5000"


function GenerateTable() {
    
    //Build an array containing Customer records.
    let cart =get_cart()
    if (Object.keys(cart).length==0){
        let empty = document.createElement("p")
        empty.innerHTML= "No items in Cart! Please go back to the shop and add items to the cart!"
        var dvTable = document.getElementById("carts_table");
        dvTable.innerHTML = "";
        dvTable.appendChild(empty);
        
    }
    else{
    var customers = new Array();
    customers.push(["Item Name ", "Kind" ,"Size","Price per Unit","Amount","Total"]);
    

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.classList.add('nicetable')
    table.border = "1";

    //Get the count of columns.
    
    
    var columnCount = customers[0].length
    
    //Add the header row.
    var row = table.insertRow(-1);
    
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.classList.add("cartheader");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }
    
    let item_list=get_items()



    for (var x in cart) {
        console.log(x)
        row = table.insertRow(-1);
        row.classList.add("cartrows");
        var arr = [item_list[x].name,item_list[x].kind,item_list[x].size,item_list[x].price.toString()+"$",cart[x],item_list[x].price*cart[x].toString()+"$"]
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            
            cell.innerHTML = arr[j];
        }
    }
    var dvTable = document.getElementById("carts_table");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
        var submit = document.createElement("button")
        submit.innerHTML="Confirm Order"
        submit.onclick= function(){send_order()}
        dvTable.appendChild(submit)
        }
    }


    
    
function put_dict(item){
        localStorage.setItem("cart", JSON.stringify(item));
    }
    
function send_order(){
        
        cart= get_cart()
        if (cart ==null){
           alert("No items in cart!")
        }else{
            console.log(cart)

            fetch(`${SERVER_URL}/add_order`, {
            
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUserToken()}`
                },
                body: JSON.stringify(cart),
            }).then(response => {
                if (!response.ok) {
                    alert("Something went Wring")
                }
                else{
                    alert("Order Successful!")
                    clear_cart()
                    location.reload()
                }
            })
        
            
        
    }


 }   
    
    //helper function since dict stored as string in localstorage
function get_cart(){
        return JSON.parse(localStorage.getItem("cart"));
    }
function get_items(){
        return JSON.parse(localStorage.getItem("items"));
    }
function getUserToken() {
        return localStorage.getItem("TOKEN");
    }
function clear_cart(){
        cart={}
        put_dict(cart)
    }