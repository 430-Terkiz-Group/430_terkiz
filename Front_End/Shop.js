
var SERVER_URL = "http://127.0.0.1:5000"


var item_list=[] //used to get all items available from db using api call
                 //use list to show available items (required so that i know the id of the item added to cart)


//storing all items in the list
fetch(`${SERVER_URL}/get_all_items`,{method:'GET'})
                  .then(response => response.json())
                  .then(data => {
                   for (x in data){
                       item_list.push(data[x])
                       
                   }

                  })

for (x in item_list){console.log(x)}


//this function takes in the item ID and the amount to add 
//stored in local storage
function add_to_cart(itemID,ammount){
        
        var cart = get_cart()
        console.log("cart before adding",cart)
        if (cart==null){//if no item in cart then create cart put key-value and save it in local storage 
            cart = {itemID:ammount}
            put_dict(cart)
        }
        else{//here item already in cart, need to check if we are adding same item or not, update accordingly
            if (itemID in cart){//update amount
                var oldAmount = cart[itemID]
                cart[itemID]= oldAmount + ammount
            }
            else {//save new key value pair
                cart[itemID]= ammount
            }
            put_dict(cart)//overwrite old cart

        }

        
        console.log("new cart",cart)
}
    

//this function takes in the item ID and the amount to add 
//stored in local storage
function remove_from_cart(itemID,ammount){
    
    var cart = get_cart()
    console.log("cart before removing",cart)
    if (cart==null){//if no item in cart nothing to do 
        
    }
    else{//here item already in cart
        if (itemID in cart){//update amount
            var oldAmount = cart[itemID]
            newAmount =oldAmount-ammount
            if (newAmount<= 0 ){//can remove the current selection since no more of this item held in cart
                    delete cart[itemID]
            }
            else{
                cart[itemID]=newAmount
            }
            
        }
        
        put_dict(cart)//overwrite old cart

    }   
    console.log("new cart",cart)



}

//function to clear cart
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
/*
clear_cart()
function test(){
     add_to_cart(1,3)
     
     add_to_cart(1,3)
     add_to_cart(2,3)
     
     remove_from_cart(1,4)
     remove_from_cart(1,2)



}
test()*/