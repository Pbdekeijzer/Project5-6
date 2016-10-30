$(document).ready(function(){

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "http://localhost:5000/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#product");
            var template = Handlebars.compile(data);
            for(var i in json){
            var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id};
            var html    = template(context);
            container.append(html);
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
    $("input:checkbox[name=cb]:checked").each(function(){
        continentList.push($(this).val());
    })
    return continentList;
}

function checkClass(){
    var classification = "";
    if ($("#selectMenu option:selected").text() != "All"){
        classification = $("#selectMenu option:selected").text();
    }
    return classification;
}

function filterItems(){
    var conList = checkedList();
    var classification = checkClass();
    SearchItems(conList, classification);
}

$("#search_input").on("input", filterItems);
$("#selectMenu").change(filterItems);
$("input:checkbox").change(filterItems);

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