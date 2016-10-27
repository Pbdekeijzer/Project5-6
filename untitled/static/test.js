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
                var context = {title: json[i].name, body: json[i].description, image: json[i].image};
                var html    = template(context);
                row.append(html);
            }
        });
    };

    // GET JSON from URL, call insert product.
    // param = string
    function GetJSONFromUrl(param){
        $.ajax({       
            url: "http://localhost:5000/" + param,   
        }).done(function(json){
             InsertProduct(json);
        });     
    };

    function ReadyItemArguments(name, properties, minprice, maxprice){
        var address = "items?"
        if(name != null){
            address += "name=" + name;
        }

        if(properties != null){
            if( typeof properties === 'string' ) {
                properties = [ properties ];
            }
            address += "&property="
            properties.forEach(function(value, index, array){
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
        GetJSONFromUrl(address);
    }
    ReadyItemArguments(null, null, null, null);
});