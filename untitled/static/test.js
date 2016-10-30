$(document).ready(function(){

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "http://localhost:5000/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#test");
            var row = $("<div class='row'></div>");
            container.append(row);
            for(var i = 0; i < json.length; i++){
                if(i % 3 == 0){
                    row = row = $("<div class='row'></div>");
                    container.append(row)
                }
                var template = Handlebars.compile(data);
                var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id};
                var html    = template(context);
                row.append(html);
            }
        });
    };

    function RemoveHTMLPanels(){
        $(".container").empty();
    }
    // GET JSON from URL, call insert product.
    // param = string
    function GetJSONFromUrl(param){
        $.ajax({       
            url: "http://localhost:5000/" + param,   
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };

    function checkedList(){
    var continentList = [];
    if($("#checkboxNA").is(":checked")){ continentList.push("North_America"); }
    if($("#checkboxSA").is(":checked")){ continentList.push("South_America"); }
    if($("#checkboxAUS").is(":checked")){ continentList.push("Australia"); }
    if($("#checkboxANTA").is(":checked")){ continentList.push("Antarctica"); }
    if($("#checkboxAFR").is(":checked")){ continentList.push("Africa"); }
    if($("#checkboxASIA").is(":checked")){ continentList.push("Asia"); }
    if($("#checkboxEU").is(":checked")){ continentList.push("Europe"); }
    return continentList;
}

function checkClass(){
    var classification = "";
    if ($("#selectMenu option:selected").text() != "All"){
        classification = $("#selectMenu option:selected").text();
    }
    return classification;
}

$("#search").on("click", function(event){
    var conList = checkedList();
    var classification = checkClass();
    event.preventDefault();
    SearchItems(conList, classification);
});

$("#search_input").keypress(function(event){
    if(event.which == 13){
        var continents = checkedList();  
        var classification = checkClass();     
        event.preventDefault();
        SearchItems(continents, classification);
    }
})

function SearchItems(continents, classification){
    $.ajaxSetup({async:false});

    var searchbarvalue = $("#search_input").val();
    var minprice = 0;
    var maxprice = 10000;
    var address = ReadyItemArguments(searchbarvalue, classification, continents, minprice, maxprice);
}

function ReadyItemArguments(name, classification, continents, minprice, maxprice){
    var address = "items?"

    if(name != null){
        address += "name=" + name;
    }

    if(classification != null){
        address+= "&class=" + classification;
    }

    if(continents != null){
        address += "&continent="
        continents.forEach(function(value, index, array){
            address+= value;
            if(index != (array.length-1)){
                address+= "+";
            }
        });
    }
    if(maxprice != null){
        address+= "&maxprice=" + maxprice;
    }
    if(minprice != null){
        address+= "&minprice=" + minprice;
    }
    address.replace(" ", "%20");
    GetJSONFromUrl(address);
}
     ReadyItemArguments(null, null, null, null);
});