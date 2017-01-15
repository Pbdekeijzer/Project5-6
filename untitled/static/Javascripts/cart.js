////////////////////////////////////////////////////////////////

var cart = [];

//not used
function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}

function cart_onClick(id, name, price){
	AddToCart(id, name, price);
}

function AddToCart(id, name, price) {

	// load cart data from local storage
	if (localStorage.cart)
	{
		cart = JSON.parse(localStorage.cart);  
	}

	// Retrieve the cart object from local storage
	if (localStorage){
		var pid = id;
		var pname = name;
		var pprice_string = price;
		var pprice = parseInt(pprice_string);
		var pquantity = 1; //can change this to dropdown value?

		var product = { ID : pid, Name: pname, Price: pprice, Quantity: pquantity };
		console.log(product);
		//didnt work without the if statement on cart.length for some reason
		if (cart.length > 0){
			for(var i in cart){
				if (cart[i].Name == pname){
					cart[i].Quantity += 1;
					cart[i].Price += pprice;
					saveCart(cart);
					console.log("Item already exists");
					console.log(cart[i].Price);
                    console.log(cart[i].Quantity);
					return;
				}             
			}  
		}    

		console.log("Item not yet in cart");
		cart.push(product);
		saveCart(cart);
		return;
	} 
}

//Save cart
function saveCart(cart){
	if (window.localStorage)
	{
		localStorage.setItem('cart', JSON.stringify(cart));
	}
}

//Delete from cart
function deleteItem(index){
    cart = JSON.parse(localStorage.cart);

    for (var i in cart){
        if (i == index){
            if (cart[i].Quantity > 1){
                //update item at index
                cart[i].Quantity -= 1;              
            }
            else{
                //delete item at index
                cart.splice(i, 1);
            }
        }      
    }
    //try without first
    // newcart = JSON.stringify(cart);
   
    saveCart(cart);
    showCart();

}

//Show cart in HTML
function showCart() {
    // if (cart.length == 0) {
    //     $("#cart").css("visibility", "hidden"); // hide table that shows cart
    //     return;
    // }
    cart = [];

    cart = JSON.parse(localStorage.cart);

    $("#cart").css("visibility", "visible");
    $("#cartBody").empty();  //empty the cart
    var totalPrice = 0;

    for (var i in cart) {
        var item = cart[i];
        totalPrice += (item.Price * item.Quantity);
        var row = "<tr><td>" + item.Name + "</td><td>" +
                "€" + item.Price + ",-" + "</td><td>" + item.Quantity + "</td><td>"
                + "€" + item.Quantity * item.Price + ",-" + "</td><td>"
                + "<button onclick='deleteItem(" + i + ")'>Delete</button></td></tr>";
        $("#cartBody").append(row);
    }
    var row = "<tr><td></td><td></td><td></td><td>" + "€" + totalPrice + ",-" + "</td><td></td></tr>";
    $("#cartBody").append(row);
}

$(document).ready(function()
{
    showCart();
});


