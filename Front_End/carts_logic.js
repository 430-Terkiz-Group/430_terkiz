


function GenerateTable() {
    //Build an array containing Customer records.
    var customers = [];
    customers.push(["Item Name ", "Kind" ,"Size","Price per Unit","Amount","Total"]);
    

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.classList.add('nicetable')
    table.border = "1";

    //Get the count of columns.
    let cart =get_cart()
    console.log(cart)
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
    }

    function clear_cart(){
        var cart = get_cart()
        cart={}
        put_dict(cart)
    }
    
    //helper function to save dict to localstorage
    function put_dict(item){
        localStorage.setItem("cart", JSON.stringify(item));
    }
    
    
    
    //helper function since dict stored as string in localstorage
    function get_cart(){
        return JSON.parse(localStorage.getItem("cart"));
    }
    function get_items(){
        return JSON.parse(localStorage.getItem("items"));
    }