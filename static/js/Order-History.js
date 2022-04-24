const SERVER_URL = "http://127.0.0.1:5000"


function GenerateTable(){

    fetch(`${SERVER_URL}/get_order_history`, {
            
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getUserToken()}`
        }
        
    }).then(response => {
        if (!response.ok) {
            alert("Something went Wring")
        }
        else{
            return response.json()
        }
    }).then(data=>{
            //here data is the json of all orders
            if (Object.keys(data)==null){//if no order history
                let empty = document.createElement("p")
                 empty.innerHTML= "You have not Ordered any Item!"
                 var dvTable = document.getElementById("history_table");
                dvTable.innerHTML = "";
                dvTable.appendChild(empty);


            }
            else{

    
    var hd = new Array();
    hd.push(["Order Id","Order Date","Item Name ", "Kind" ,"Size","Price per Unit","Amount","Total"]);
    

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.classList.add('nicetable')
    table.border = "1";

    //Get the count of columns.
    
    
    var columnCount = hd[0].length
    
    //Add the header row.
    var row = table.insertRow(-1);
    
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.classList.add("cartheader");
        headerCell.innerHTML = hd[0][i];
        row.appendChild(headerCell);
    }
    
    



    for (var x in data) {
        
        row = table.insertRow(-1);
        row.classList.add("cartrows");
        var arr = [x,data[x].date,data[x].name,data[x].kind,data[x].size,data[x].price.toString()+"$",data[x].amount,data[x].price*data[x].amount.toString()+"$"]
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            
            cell.innerHTML = arr[j];
        }
    }
    var dvTable = document.getElementById("history_table");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);

            }





    })



}


  function getUserToken() {
    return localStorage.getItem("TOKEN");
  }


function view_user(){
      
    fetch(`${SERVER_URL}/view_info`,{method:'POST',headers: {
      'Content-Type': 'application/json'},body: JSON.stringify({"token":getUserToken()})}
)
    .then(response => response.json())
    .then(data => {
      document.getElementById("username").innerHTML=data["username"]
      document.getElementById("mail").innerHTML=data["mail"]
      document.getElementById("date_joined").innerHTML=data["date_joined"]
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
view_user();