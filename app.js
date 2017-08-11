var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var router = require('./router.js');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine','ejs');
app.use(express.static('./Public'));


app.use(function (err,req,res,next) {
	console.log(err);
})
app.use('/',router)

app.listen(process.env.PORT||3000,function () {
	console.log("Server listening at port 3000");
});