const database = require('mime-db');
var Twit = require('twit');
var http = require('http'); // Import Node.js core module

//twitter developer information
var T = new Twit({
    consumer_key: 'FDiRuHtMQNNqQTBfjtgWBVsyi',
    consumer_secret: 'zjSg0erCz0Hipsp5MMuZihXC3fSpuBojqZEk8jb582EdThwg3Z',
    access_token: '1487553940442914819-nECWjxzEB05LPZmy8RiDXGze5hgpL6',
    access_token_secret: 'Ii6I7srnlOg2MJRKUDA6LrqyT8xPAzB1EngKsj2QQLiJY'
});

var server = http.createServer(function (req, res) {  //creating the web server
    function outputdata(err, data) {
        var tweets = data.statuses
        
        //looping through all data from the tweet
        for (var i = 0; i < tweets.length; i++) {
            res.write('<blockquote class="twitter-tweet">\n')
            //the tweet url inserted in with user screen name and user tweet ID
            res.write(`<a href="https://twitter.com/${tweets[i].user.screen_name}/status/${tweets[i].id_str}"></a>\n`)
            res.write('</blockquote>\n\n')
        }
        //twitter embeded tweet / widget information
        res.write('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n')

        res.write('</body>\n')

        //adding user input at the end of the url
        ///KEYWORD
        res.write('<script> function keywordFunction() {window.location = document.getElementById("keyword").value} </script>')

        res.write('</html>\n')
        res.end();
    }


    if (req.url == '/') { //check the URL of the rent request

        res.write('<html><body>\n')

        res.write("<body>")
        res.write("<h1>Sports tweet API</h1>")
        res.write("<h5>Current Filters: workouts, strength training, sport, sport, injury, & yoga</h5>")
        res.write("<h5>Insert additonal filters</h5>")
        res.write("</body>")

        res.write(`<input type="search" id="keyword">`) //textbox
        res.write(`<button onclick="keywordFunction()">Add</button>`) //button
        res.write(`<p id="search"></p>`)
        
        //q: parameters for twitter search / count: number of tweets showing up
        var params = {q: 'workouts OR strength and training OR sport and injury OR sport OR sports OR yoga', count: 25}

        //using devloper information
        //'search/tweets': searching twitter tweets
        //params: pre-set parameter given by var params
        //outputdata: function to print tweet to screen
        T.get('search/tweets', params, outputdata);

    }
    else {
        //when the user inputs a new keyword, this else is launched when the url is changed with /KEYWORD
        res.write('<html><body>\n')

        res.write("<body>")
        res.write("<h1>Sports Tweet API</h1>")
        res.write(`<h5>Current Search Filters: workouts, strength training, sport, sport, injury, yoga, & ${req.url.substring(1, req.url.length)}</h5>`)
        res.write("<h5>Add additonal filters</h5>")
        res.write("</body>")


        res.write(`<input type="search" id="keyword">`) //textbox
        res.write(`<button onclick="keywordFunction()">Add</button>`) //button
        res.write(`<p id="search"></p>`)
        
        //parameters for twitter search along with user input keyword
        var params = {q: `workouts OR strength and training OR sport and injury OR sport OR sports OR yoga OR ${req.url}`, count: 25}

        T.get('search/tweets', params, outputdata);
    }
});


server.listen(5000);
console.log("working...")