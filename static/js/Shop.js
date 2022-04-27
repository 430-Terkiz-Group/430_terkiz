
var SERVER_URL = "http://127.0.0.1:5000"


//used to get all items available from db using api call
//use list to show available items (required so that i know the id of the item added to cart)


//storing all items in the list


var changed = false


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
console.log(ite)

function GenerateShop() {
    var items = document.getElementById("items")
    var row = document.createElement("div");
    row.classList.add("row")

    for (var i = 0; i < 3; i++) {
        var block = document.createElement("div");
        block.classList.add("block")

        var card = document.createElement("div");
        card.classList.add("card")

        var img = document.createElement("img");
        img.classList.add("img")
        img.src = "";
        img.alt = "Item";
        var name = document.createElement("h2");
        name.classList.add("name");
        name.innerHTML = "Name";
        var price = document.createElement("p");
        price.classList.add("price");
        price.innerHTML = "$400";
        var amount = document.createElement("p");
        amount.classList.add("amount");
        amount.innerHTML = "0";
        var add = document.createElement("button");
        add.classList.add("add-button");
        add.innerHTML = "ADD TO CART";
        var remove = document.createElement("button");
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
}

//this function takes in the item ID and the amount to add 
//stored in local storage
function add_to_cart(itemID, ammount) {

    var cart = get_cart()
    console.log("cart before adding", cart)
    if (cart == null) {//if no item in cart then create cart put key-value and save it in local storage 
        cart = { itemID: ammount }
        put_dict(cart)
    }
    else {//here item already in cart, need to check if we are adding same item or not, update accordingly
        if (itemID in cart) {//update amount
            var oldAmount = cart[itemID]
            cart[itemID] = oldAmount + ammount
        }
        else {//save new key value pair
            cart[itemID] = ammount
        }
        put_dict(cart)//overwrite old cart

    }


    console.log("new cart", cart)
}


//this function takes in the item ID and the amount to add 
//stored in local storage
function remove_from_cart(itemID, ammount) {

    var cart = get_cart()
    console.log("cart before removing", cart)
    if (cart == null) {//if no item in cart nothing to do 

    }
    else {//here item already in cart
        if (itemID in cart) {//update amount
            var oldAmount = cart[itemID]
            newAmount = oldAmount - ammount
            if (newAmount <= 0) {//can remove the current selection since no more of this item held in cart
                delete cart[itemID]
            }
            else {
                cart[itemID] = newAmount
            }

        }

        put_dict(cart)//overwrite old cart

    }
    console.log("new cart", cart)



}
function store_item(item) {
    if (changed == false) { clear_items(); changed = true }
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

function test() {
    clear_cart()
    add_to_cart(1, 3)

    add_to_cart(1, 3)
    add_to_cart(2, 3)





}
test()

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
