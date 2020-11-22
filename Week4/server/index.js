const express = require("express");
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // the '/css' evaluates to -> http://localhost:3000/css
app.use('/js', express.static(__dirname + '/public/src'));

app.listen(3000, function(){
    console.log("server started at http://localhost:%s", 3000);
});






