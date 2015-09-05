var express = require('express');
var app = express();

app.set('view engine','ejs');
app.use(express.static('./'));

app.listen(8000, function(){
    console.log('app running on port 8000');

    app.get('/',function(req,res){
        console.log('got a request');
        res.render('index');
    });
});