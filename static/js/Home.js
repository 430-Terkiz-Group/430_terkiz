function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}
function clear_cart(){
    cart={}
    put_dict(cart)
}
function put_dict(item){
    localStorage.setItem("cart", JSON.stringify(item));
}

clearUserToken()
console.log("Cleared Token")

clear_cart()
console.log("Cleared Cart")
