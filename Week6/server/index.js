const express = require("express");
const app = express();

const port = process.env.PORT || 4000; //PORT=??? npm start to override

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // the '/css' evaluates to -> http://localhost:4000/css
app.use('/js', express.static(__dirname + '/public/src')); // the '/js' evaluates to -> http://localhost:4000/js

app.listen(port, function(){
    console.log("server started at http://localhost:%s", port);
});






