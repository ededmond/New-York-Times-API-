var apiKey = "2uLSCfNAfY93MR1jQWuIUkNjuKASxxGD";
var articleSection = $("#article-section");

function search(term,limit,startYear,endYear) {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json?"
    var dates = ""; 
    if (startYear < endYear) {
        dates= "&begin_date="+startYear+"0101&end_date=" +endYear+"1231";
    }
    queryURL = queryURL + dates
    queryURL = queryURL + "&q="+term+"&sort=oldest&api-key=" +apiKey;
    var loading = $("<img>").attr("src","https://media0.giphy.com/media/sSgvbe1m3n93G/200.gif");
    loading.addClass("loadingGif");
    // console.log(queryURL);
    $("body").append(loading);
    $.get(queryURL).then(function(response) {
        loading.remove();
        console.log("got here");
        console.log(response);
        // console.log(response.response.docs[0].source);
        if (response.status !== "OK") {
            return false;
        }
        articleSection.html("");
        var data = response.response.docs;
        console.log(data.length);
        if (data.length < 1) {
            articleSection.html("<p>No articles found</p>")
            return false;
        }
        for (var i = 0; i < data.length;i++) {
            if (i >= limit) {
                break;
            }
            var article = $("<div>");
            article.addClass("article");
            var title = $("<h1>").text(data[i].headline.main);
            var snip = $("<p>").text(data[i].snippet);
            var url = $("<a>").text("read more").attr("href",data[i].web_url)
            var dateString = data[i].pub_date.split("T")[0];
            var date = $("<p>").text(dateString);
            article.append(title,snip,date,url);
            articleSection.append(article);
        }
    })
}
$("#search").on("click",function() {
    var term = $("#searchTerm").val();
    var limit = $("#dropdown").val();
    var startDate = $("#startYear").val();
    var endDate = $("#endYear").val();
    search(term,limit,startDate,endDate);
})
$("#clear").on("click",function() {
    articleSection.html("");
})
