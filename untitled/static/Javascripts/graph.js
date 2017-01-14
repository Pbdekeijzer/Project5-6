$(document).ready(function()
{
  var BarTemplate;
  function LoadBarTemplate(){
    $.ajax({
              url: "http://localhost:5000/static/Graphbar.html"
          }).done(function(data){
              BarTemplate = Handlebars.compile(data);
          });
  }
  LoadBarTemplate();


  $("#TestLoadGraph").click(function(e){
    var Data = [[134, 1], [ 12, 2], [ 16, 3], [ 18, 4], [ 19, 5], [ 100, 6], [ 50, 7], [ 99, 8], [ 87, 9], [ 150, 10], [ 130, 11], [114, 12]];  //[134, 12, 16, 18, 19, 100, 50, 99, 87, 150, 130, 114];
    var month = $("#MonthMenu option:selected").text();

    BuildGraph("testgraph " + month, Data);
  })
  $("#SalesOfItem").click(function(e){
    var Data = [[10, 1], [ 1, 2], [ 0, 3], [ 30, 4], [ 50, 5], [ 12, 6], [ 8, 7], [ 1, 8], [ 3, 9], [ 4, 10], [ 5, 11], [6, 12]];  //[134, 12, 16, 18, 19, 100, 50, 99, 87, 150, 130, 114];
    var month = $("#MonthMenu option:selected").text();
    var title = "Sales of item X in month " + month;
    BuildGraph(title ,Data);
  })
  $("#TotalTransactions").click(function(e){
    var Data = [[12, 1], [ 8, 2], [ 9, 3], [ 7, 4], [ 2, 5], [ 40, 6], [ 38, 7], [ 15, 8], [ 87, 9], [ 70, 10], [ 12, 11], [40, 12]];  //[134, 12, 16, 18, 19, 100, 50, 99, 87, 150, 130, 114];
    var month = $("#MonthMenu option:selected").text();
    var title = "Total transactions per day in month " + month;
    BuildGraph(title ,Data);
  })
  $("#UserRegistration").click(function(e){
    var Data = [[1, 1], [ 0, 2], [ 2, 3], [5, 4], [ 3, 5], [ 4, 6], [ 6, 7], [ 7, 8], [ 5, 9], [ 4, 10], [ 1, 11], [3, 12]];  //[134, 12, 16, 18, 19, 100, 50, 99, 87, 150, 130, 114];
    var month = $("#MonthMenu option:selected").text();
    var title = "Users registered in month " + month;
    BuildGraph(title ,Data);
  })

  function BuildGraph(Title, Data){
  var highest = 0;
      Data.forEach(function(element) {
        if(element[0] > highest){ highest = element[0]}
      }, this);
      console.log(highest);

      var Container = $("#Graph");
      var titlecontainer = $("#GraphTitle");
      titlecontainer.html(String(Title));
      Container.empty();

      Data.forEach(function(element) {
        var bar = BuildBar(element[0], highest, element[1]);
        Container.append(bar);
      }, this);
  }

  function BuildBar(NumericValue, MaxValue, Date){
            var height = Math.round( NumericValue/MaxValue * 100);
            var inverseHeight = 100-height;
            var numValue = String(Date) + " : " + String(NumericValue);
            var context = {NumericValue: numValue, InverseHeight: inverseHeight, Height: height, Date: Date};
            return BarTemplate(context);
    };




});

