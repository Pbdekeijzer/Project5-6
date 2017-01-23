// remove this to different file
function GetItemJson(id){
    $.ajax({
        url: "/items?id=" + String(id)
    }).done(function(json){
        json = JSON.stringify(json[0]);
        console.log(json);
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

function wishlist_onClick(id){
	GetItemJson(id);
}

$(document).ready(function(){

	console.log($(".wishlist-button"));

	/*var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'http://localhost:5000/static/images/nodont.mp4');

	$.get();

	audioElement.addEventListener("load", function() {
		audioElement.play();
	}, true);*/


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


	// function LogSlider(options) {
	// 	options = options || {};
	// 	this.minpos = options.minpos || 0;
	// 	this.maxpos = options.maxpos || 100;
	// 	this.minlval = Math.log(options.minval || 1);
	// 	this.maxlval = Math.log(options.maxval || 100000);

	// 	this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);
	// }

	// LogSlider.prototype = {
	// 	// Calculate value from a slider position
	// 	value: function(position) {
	// 		return Math.exp((position - this.minpos) * this.scale + this.minlval);
	// 	},
	// 	// Calculate slider position from a value
	// 	position: function(value) {
	// 		return this.minpos + (Math.log(value) - this.minlval) / this.scale;
	// 	}
	// };


	// // Usage:

	// var logsl = new LogSlider({maxpos: 30, minval: 0, maxval: 100000000});

	// $('#slider').mousemove(function() {
	// 	var val = logsl.value(+$(this).val());
	// 	$('#value').val(val.toFixed(0));
	// });

	// $('#value').on('input', function() {
	// 	var pos = logsl.position(+$(this).val());
	// 	$('#slider').val(pos);
	// });

	// $('#value').val("1000").trigger("keyup");

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#product");
            var template = Handlebars.compile(data);
            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price, stock: json[i].in_stock};
				var html = template(context);
				container.append(html);

				if (!window.document.cookie){
					$(".wishlist-button").hide();			
				}	

				//var wishlistItems = getWishlistItems();
				
				$(".wishlist-button").css("opacity", 1);	
            }
        });
    };




	function GetWishlistItems(){
        var url = document.URL
        var account = document.window.cookie

        var des_url = des_url = "/" + account + "/wishlist";

        $.ajax({
            url: des_url             
        }).done(function(json){

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
		})
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