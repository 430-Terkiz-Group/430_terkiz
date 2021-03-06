
var SERVER_URL = "http://127.0.0.1:5000"


//used to get all items available from db using api call
//use list to show available items (required so that i know the id of the item added to cart)


//storing all items in the list

let item_count = 0


fetch(`${SERVER_URL}/get_all_items`, { method: 'GET' })
    .then(response => { return response.json() })
    .then(data => {
        //clear_items()

        for (x in data) {

            //console.log(data[x])



            store_item(data[x])





        }



    })

var ite = get_items()
let item_list=[]
for (var item in ite){
    item_list.push(ite[item])

}
console.log(item_list)


console.log(get_cart())
function GenerateShop() {

    if (item_count>item_list.length-1){
        alert("No more items in Store!")
    }
    else{
    var items = document.getElementById("items")
    var row = document.createElement("div");
    row.classList.add("row")
    user_cart=get_cart()
    for (var i = item_count; i < item_count+3; i++) {
        
        var block = document.createElement("div");
        block.classList.add("block")

        var card = document.createElement("div");
        card.classList.add("card")

        var img = document.createElement("img");
        img.classList.add("img")
        img.src = "static/images/items/" + item_list[i].id + ".png";
        img.alt = "Item";
        var name = document.createElement("h2");
        name.classList.add("name");
        name.innerHTML = item_list[i].name;
        var price = document.createElement("p");
        price.classList.add("price");
        price.innerHTML = "Price: " +"$"+item_list[i].price;
        var amount = document.createElement("p");

        amount.id="amount"+item_list[i].id
        console.log(amount.id)
        amount.classList.add("amount");
        if(item_list[i].stockleft<=0){amount.innerHTML ="OUT OF STOCK";amount.style.color='#d00'}
        else{
        if(item_list[i].id in user_cart  ){amount.innerHTML ="Amount in cart: "+user_cart[item_list[i].id]
                                            }
        else{amount.innerHTML = 'Amount in cart : 0'}
        }
        var add = document.createElement("button");
        add.classList.add("add-button");
        add.innerHTML = "ADD TO CART";
        let curr=item_list[i].id
        add.onclick=function()            
        {  
            add_to_cart(curr,1)}
        var remove = document.createElement("button");
        remove.onclick=function(){remove_from_cart(curr,1)}
        remove.classList.add("remove-button");
        remove.innerHTML = "REMOVE TO CART";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(amount);
        card.appendChild(add);
        card.appendChild(remove);

        block.appendChild(card);

        row.appendChild(block);
    }
    items.appendChild(row);
    item_count+=3;}
}

//this function takes in the item ID and the amount to add 
//stored in local storage
function add_to_cart(itemID, ammount) {
    console.log(itemID)
    let amm = document.getElementById("amount"+itemID)
    if(amm.innerHTML=="OUT OF STOCK"){
        alert("Item out of stock!")
        return;
    }
    var cart = get_cart()
    console.log("cart before adding", cart)
    if (cart == null) {//if no item in cart then create cart put key-value and save it in local storage 
        cart = { itemID: ammount }
        put_dict(cart)
    }
    else {//here item already in cart, need to check if we are adding same item or not, update accordingly
        if (itemID in cart) {//update amount
            var oldAmount = cart[itemID]
            curr_it=get_items()
            if(oldAmount+ammount>curr_it[itemID].stockleft){
                alert("No more items of this kind available in stock!")
                return;

            }
            cart[itemID] = oldAmount + ammount
        }
        else {//save new key value pair
            cart[itemID] = ammount
        }
        put_dict(cart)//overwrite old cart

    }
    
    amm.innerHTML= 'Amount in cart: '+cart[itemID]


    console.log("new cart", cart)
}


//this function takes in the item ID and the amount to add 
//stored in local storage
function remove_from_cart(itemID, ammount) {
    let amm = document.getElementById("amount"+itemID)
    if(amm.innerHTML=="OUT OF STOCK"){
        alert("Item out of stock!")
        return;
    }
    var cart = get_cart()
    console.log("cart before removing", cart)
    let edge=0

    if (cart == null) {//if no item in cart nothing to do 
        alert("No such item in Cart!")
    }
    else {//here item already in cart
        if (itemID in cart) {//update amount

            
                var oldAmount = cart[itemID]
                if(oldAmount==0){
                    alert("No such item in Cart!")
                }


                newAmount = oldAmount - ammount
                
                if (newAmount <= 0) {//can remove the current selection since no more of this item held in cart
                    delete cart[itemID]
                    edge=0
                }
                else {
                    cart[itemID] = newAmount
                    edge=newAmount
                }

        }
        else{alert("No such item in Cart!")}

        put_dict(cart)//overwrite old cart

    }
    
    amm.innerHTML= 'Amount in cart: '+edge

    console.log("new cart", cart)



}
function store_item(item) {
    
    var id = item.id

    var items = get_items()
    if (items == null) {
        items = {}
        console.log(id)
        items[id] = item
    }
    else {
        items[id] = item
    }
    put_item(items)



}
//function to clear cart
function clear_cart() {

    cart = {}
    put_dict(cart)
}

//helper function to save dict to localstorage
function put_dict(item) {
    localStorage.setItem("cart", JSON.stringify(item));
}



//helper function since dict stored as string in localstorage
function get_cart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function clear_items() {

    items = {}
    put_item(items)
}

//helper function to save dict to localstorage
function put_item(item) {
    localStorage.setItem("items", JSON.stringify(item));
}



//helper function since dict stored as string in localstorage
function get_items() {
    return JSON.parse(localStorage.getItem("items"));
}

/*function test() {
    clear_cart()
    add_to_cart(1, 3)

    add_to_cart(1, 3)
    add_to_cart(2, 3)





}
test()*/

function checkStaff() {
    fetch(`${SERVER_URL}/check_staff`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ "token": localStorage.getItem("TOKEN") })
    }
    )
        .then(response => response.json())
        .then(data => {
            if (data["staffCheck"] == true) {
                document.getElementById("ProfileIcon").setAttribute("data-href", "About.html");
                document.getElementById("Account").setAttribute("href", "About.html");
                document.getElementById("Account1").setAttribute("href", "About.html");

            }
            else {
                document.getElementById("ProfileIcon").setAttribute("data-href", "About_User.html");
                document.getElementById("Account").setAttribute("href", "About_User.html");
                document.getElementById("Account1").setAttribute("href", "About_User.html");
            }
            console.log(data["staffCheck"]);
        })
}

function checkadmin() {
    fetch(`${SERVER_URL}/check_admin`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ "token": localStorage.getItem("TOKEN") })
    }
    )
        .then(response => response.json())
        .then(data => {
            if (data["adminCheck"] == true) {
                adminLoggedIn = true;
                document.getElementById("edit").style.visibility = "visible";
            }
            else {
                adminLoggedIn = false;
                document.getElementById("edit").style.visibility = "hidden";
            }
        })

}
checkStaff()
checkadmin()
