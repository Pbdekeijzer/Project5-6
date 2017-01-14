$(document).ready(function()
{
  LoadBarTemplate();
  ClickedMonthYearSwitch();
  LoadItems();
  LoadYears();

  function LoadYears(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    for(var i = year; i >= 1970; i--){
      $("#Years").append('<option value="'+i+'">'+i+'</option>');
    }
  }

  function LoadItems(){
    $.ajax({
      url: "http://localhost:5000/items"
    }).done(function(data){
      for(var i in data){
        $("#Items").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
      }
    });
  }


  var ShowingYear = true;
  $("#SwitchYearMonth").click(function(e){
    ClickedMonthYearSwitch();
  });


  function ClickedMonthYearSwitch(){
    if(ShowingYear){
      $("#MonthButtons").css("display", "inline-block");
      $("#YearButtons").css("display", "none");
    }
    else{
      $("#MonthButtons").css("display", "none");
      $("#YearButtons").css("display", "inline-block");
    }
    ShowingYear = !ShowingYear;
  }

  var BarTemplate;
  function LoadBarTemplate(){
    $.ajax({
              url: "http://localhost:5000/static/GraphItems/Graphbar.html"
          }).done(function(data){
              BarTemplate = Handlebars.compile(data);
          });
  }
  
  $("#SalesOfItem").click(function(e){
    var month = $("#MonthMenu option:selected").text();
    var monthval = $("#MonthMenu option:selected").val();
    var year = $("#Years option:selected").text();
    var item = $("#Items option:selected").val();

    if(ShowingYear){
      $.ajax({
        url: "http://localhost:5000/stats?id=" + item + "&year=" + year
      }).done(function(data){
        var title = "Sales of " + $("#Items option:selected").text() + " in " + year;
        BuildGraph(title ,data, true);
      });
    }
    else{
      $.ajax({
        url: "http://localhost:5000/stats?id=" + item + "&year=" + year + "&month=" + monthval
      }).done(function(data){
        var title = "Sales of " + $("#Items option:selected").text() + " in " + month + " of " + year;
        BuildGraph(title ,data, false);
      });
    }

  })
  $("#WishlistButton").click(function(e){
    var maxItems = 10;
    $.ajax({
      url: "http://localhost:5000/stats?MaxWishlistItems=" + maxItems
    }).done(function(data){
      BuildGraph("Most wished for items", data, true, 60, 20);
    })

  })

  function BuildGraph(Title, Data, DoBig, width, margins){
    var highest = 0;
    Data.forEach(function(element) {
      var num = element.amount;
      
      if(num > highest){
         highest = num
      }
    }, this);
    console.log(highest);

    var Container = $("#Graph");
    var titlecontainer = $("#GraphTitle");
    titlecontainer.html(String(Title));
    Container.empty();
    if(width !== undefined & margins !== undefined){
      Container.append("<style>.GraphBar{  width: " + width + "px;  margin-left: " + margins + "px;  margin-right: " + margins + "px;}</style>")
    }
    else{
      if(DoBig){
        Container.append("<style>.GraphBar{  width: 40px;  margin-left: 10px;  margin-right: 10px;}</style>")
      }
      else{
        Container.append("<style>.GraphBar{  width: 20px;  margin-left: 5px;  margin-right: 5px;}</style>")
      }
    }

    Data.forEach(function(element) {
      var bar = BuildBar(element.amount, highest, element.xAxis);
      Container.append(bar);
    }, this);
  }

  function BuildBar(NumericValue, MaxValue, xAxis){
    if(MaxValue == 0){
      height = 0;
    }
    else{
    var height = Math.round( NumericValue/MaxValue * 100);
    }
    var inverseHeight = 100-height;
    var numValue = String(xAxis) + " : " + String(NumericValue);
    var context = {NumericValue: numValue, InverseHeight: inverseHeight, Height: height, Date: xAxis};
    return BarTemplate(context);
    };




});

