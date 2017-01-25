// remove this to different file
function GetItemJson(id){
    $.ajax({
        url: "/items?id=" + String(id)
    }).done(function(json){
        json = JSON.stringify(json[0]);
		AddToWishlist(json);
    });
};

function RemoveFromWishlist(json){
    $.ajax({
        type: "POST",
        url: "/wishlist",
        data: json,
        contentType: "application/json"
    });
};

function AddToWishlist(json){
    $.ajax({
        type: "POST",
        url: "/wishlist",
        data: json,
        contentType: "application/json"
    });
};

//Function called when the wishlist button is pressed.
function wishlist_onClick(id){

	var element = document.getElementById("wishlist-buttonID" + String(id));
	var img = document.getElementById("wishlist-imgID" + String(id));

	// if ($("#wishlist-buttonID" + id).css("background-color") == "rgb(254, 152, 15)"){
		if (document.getElementById(img.id).style.opacity == 1) {
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 0.670588)");		
		document.getElementById(img.id).style.opacity = 0.4;
	}
	else{
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 1)");
		document.getElementById(img.id).style.opacity = 1;
	}
	
	GetItemJson(id);
}

$(document).ready(function(){

	//Catches a keypress of enter at the search box and calls the search function
	$("#search_input").keypress(function(event){
		if(event.which == 13){
			event.preventDefault();
			// vid.Play();
			filterItems();
		}
	});

	$("#searchbutton").click(function(){
		filterItems();
		audioElement.play();
	});

	$("#FindTheAnimals").click(function(){
        filterItems();
    });

	var wish_list = []; //global variable used to store the items from the wishlist in

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json


    function InsertProduct(json){
        $.ajax({       
            url: "/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#product");	
			var wish_listID = []; 			

			if (window.document.cookie){
				GetWishlistItems();
				
				//for each item in the wishlist, push the id to the wish_listID list
				for (var i in wish_list){	
					wish_listID.push(wish_list[i].id);
				}
			}

            var template = Handlebars.compile(data);
            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price, stock: json[i].in_stock};
				var html = template(context);
				container.append(html);

				//for each item, get the wishlist button id and change that to the wishlist button id + product id
				var element = document.getElementById("wishlist-buttonID");
				element.id = element.id + (parseInt(i)+1);		
				var img = document.getElementById("wishlist-imgID");
				img.id = img.id + (parseInt(i)+1);

				//if not logged in, hide all wishlist buttons
				if (!window.document.cookie){
					$(".wishlist-button").hide();			
				}
				
				//changes the opacity of the wishlist buttons for the items in the wishlist
				for(var y in wish_listID){	
					if (wish_listID[y] == json[i].id){
						document.getElementById(element.id).style.backgroundColor = "rgba(254, 152, 15, 1)";
						document.getElementById(img.id).style.opacity = 1;										
					}
				}				
            }
        });
    };

	//get all items from the wishlist
	//Return: json
	function GetWishlistItems(){
        var url = document.URL
        var account = document.getElementById("account_url").innerHTML;
        var des_url = des_url = "/" + account + "/wishlist";
        $.ajax({
            url: des_url,
			contentType : "application/json",
			async: false      
        }).done(function(json){
			wish_list = json;
        });     
    }     
	
	//Empty all
    function RemoveHTMLPanels(){
        $(".container1").empty();
    }
	
    // GET JSON from URL, call insert product.
    // param = string
    function GetJSONFromUrl(param){
        $.ajax({       
            url: "/" + param,   
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);			
        });     
    };

	//Reads the continents checkbox
	//Return: Array of continents
	function checkContinent(){
		var continentList = [];
		$("input:checkbox[name=cb]:checked").each(function(){
			continentList.push($(this).val());
		});
		return continentList;
	}

	//Reads the classification of a product
	//Return: String
	function checkClass(){
		var classification = "";
		if ($("#selectMenu option:selected").text() != "All"){
			classification = $("#selectMenu option:selected").text();
		}
		return classification;
	}

	//Reads the price from the dropdown menu
	//Return: string array, element 0 = minprice, element 1 = maxprice
	function checkPrice(){
		var returnPrices = ["", ""];
		if ($("#selectPrice option:selected").text() != "Any Price"){
			var prices = $("#selectPrice option:selected").text();
			if (prices == "10000+") { 
				returnPrices[0] = "10000";
				returnPrices[1]	= "9999999999999";	}
				
			else{
				var priceArray = prices.split("-"); 
				returnPrices[0] = priceArray[0];
				returnPrices[1] = priceArray[1];  
			}
			}
		return returnPrices;
	}

    function checkStock(){	
        var only_instock = "";

        if ($("#checkboxOnlyStock").is(':checked')){
            only_instock = "true";
        }
        return only_instock;
    }

    function Check_all_boxes()
    {
        $("input:checkbox[name=cb]").each(function(){
			this.checked = true;
		});
		filterItems();
    };

	function filterItems(){
		var conList = checkContinent();
		var classification = checkClass();
		var prices = checkPrice();
        var instock = checkStock();
		var searchbarvalue = $("#search_input").val();

        $.ajaxSetup({async:false});

		var address = ReadyItemArguments(searchbarvalue, classification, conList, prices[0], prices[1], instock)
	}

	// $("#search_input").on("input", filterItems);
	$("#selectMenu").change(filterItems);
	$("#selectPrice").change(filterItems);
	$("input:checkbox").change(filterItems);
    

	//Prepares an item search string which links to a json file that containts the results
	//Parameters: name: name of the product, classification: classification of the product, continents: array of continents where the the product originates, minprice: the minimum price of the product, maxprice: the maximum price of the product
	function ReadyItemArguments(name, classification, continents, minprice, maxprice, stock){
		var address = "items?"

		if(name != ""){
			address += "name=" + name;
		}

		if(classification != ""){
			if (address != "items?"){ address+= "&"; }
			address+= "class=" + classification; }
		
		if(continents.length > 0){
			if (address != "items?"){ address += "&"; }
			address += "continent="
			continents.forEach(function(value, index, array){
				address+= value;
				if(index != (array.length-1)){
					address+= "+"; //+ must become OR ||
				}
			});
		}

		if(maxprice != ""){
			address+= "&max=" + maxprice;
		}
		
		if(minprice != ""){
			address+= "&min=" + minprice;
		}

        if(stock != ""){
            address+= "&in_stock=" + stock;
        }

		address.replace(" ", "%20");
		GetJSONFromUrl(address);
	}
				
		ReadyItemArguments("", "", [], "", "", "");

	});