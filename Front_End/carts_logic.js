





function GenerateTable() {
    //Build an array containing Customer records.
    var customers = new Array();
    customers.push(["item id", "qtty"]);
    customers.push([1, "John Hammond", "United States"]);
    customers.push([2, "Mudassar Khan", "India"]);
    customers.push([3, "Suzanne Mathews", "France"]);
    customers.push([4, "Robert Schidner", "Russia"]);

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.classList.add('nicetable')
    table.border = "1";

    //Get the count of columns.
    let cart =get_cart()
    console.log(cart)
    var columnCount = 2
    
    //Add the header row.
    var row = table.insertRow(-1);
    
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.classList.add("cartheader");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    for (var x in cart) {
        row = table.insertRow(-1);
        row.classList.add("cartrows");
        var arr = [x,cart[x]]
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
