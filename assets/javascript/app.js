// let offset = 0 ;
var index=1 ;
var businessName=" " ;
getAPIData(20,0);
var high = [];
var moderate = [] ;
function getAPIData(showResult,offset){
    
$.ajax({
 
    url: "https://data.sfgov.org/resource/sipz-fjte.json",
    type: "GET",
    data: {
      "$limit" : showResult,
      "$offset" : offset,
      "$$app_token" : "LjHPv42GKlRqqjnKBW78B06jY"
    }
  }).done(function(response) {
    console.log("res1" +response);
//   console.log(response.Array[0].business_name);
   
  console.log(response[0].business_name);
  for (var i = 0; i < response.length; i++) {
    let inspectionScore = response[i].inspection_score ;
    console.log(inspectionScore);
    // if(inspectionScore != undefined){
         
     let riskCategory = response[i].risk_category ;

    var tRow = $("<tr>");
    if(parseInt(inspectionScore)== 100)
    {
        var tRow = $("<tr class='table-success'>");
    }
    else if(riskCategory=== "Moderate Risk")
    {
        var tRow = $("<tr class='table-warning'>");
    }else if(riskCategory=== "Low Risk")
    {
        var tRow = $("<tr class='table-info'>");
    }else if(riskCategory=== "High Risk")
    {
        var tRow = $("<tr class='table-danger'>");
      
    }
    var th = $("<th scope='row'>").text(index);
    var name = $("<td>").text(response[i].business_name);
    var address = $("<td>").text(response[i].business_address);
   
    var score = $("<td>").text(response[i].inspection_score);
    var category = $("<td>").text(response[i].risk_category);
    var violation = $("<td>").text(response[i].violation_description);

    tRow.append(th, name, address, score, category, violation);
     
    
    $("tbody").append(tRow);
    index++;
    }
        
  //}
  
  });
}

//   $("#next").on("click", function(event) {
   
//     getAPIData(20,20);

//   });
  
//   $('.pagination').twbsPagination({
//     totalPages: 10,
//     visiblePages: 5,
//     onPageClick: function (event, page) {
//         $("tbody").text('Page ' + page);
//     }
// });

$(function() {
    $('.pagination').pagination({
        pages:100,
        displayedPages:5,
        cssStyle: 'light-theme',
        onPageClick: function (pageNumber, event) {
            console.log("page" +pageNumber);
            if(pageNumber ==1){
                index =1 ;
            }else{
            index =  pageNumber*20-pageNumber*10;
            }
         let   offset = pageNumber*20-20;
            $("tbody").empty();
              getAPIData(20,offset);
        }
})
});

