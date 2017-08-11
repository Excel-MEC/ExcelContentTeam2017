var express = require('express');
var app = express();
var fs = require('fs');
app.set('view engine','ejs');
app.get('/favicon.ico',function (req,res) {
	res.status(204)

});
app.get('/',function (req,res) {
	var eventNames = [];
	var eventid = []
	if (fs.existsSync('./event.json')) {
		var event = require('./event.json');
		//var events =JSON.parse(event);
		for (var i = 0; i < event.length; i++) {
			eventNames.push(event[i].name);
			eventid.push(event[i].id)
		}
		res.render('index.ejs',{eventnames:eventNames,eventId:eventid})
	}
	else{
		res.render('index.ejs',{eventnames:"Nothing"})
	}
	//res.render('index.ejs')
});

app.get('/editEvents',function (req,res) {
	console.log(req.url);	
	res.render('addEvent.ejs')
})
app.get('/events/*',function (req,res) {
	var d;
	var event = require('./event.json');
	var eventid = req.url.split('/')
	if ((eventid[2]!="css")&&(eventid[2]!="js")) {
		for (var i = 0; i < event.length; i++) {
			if (event[i].id == eventid[2]) {
				d = event[i]
				//res.render('addEvent.ejs',{eventDetails:event[i]})
			}
		}
	}
	res.send(d);
})

app.get('/addEvent',function (req,res) {
	res.render("addEvent.ejs")
});

app.post('/newEvent',function (req,res) {
	console.log(req.body)
	if (fs.existsSync('./event.json')) {
		var event = require('./event.json');
		event.push(req.body);
		fs.writeFile('./event.json', JSON.stringify(event),function(err){
			if (err) {
				console.log(err)
			}
			else{
				console.log("Sucessfully appended data")
			}
		});
	}
	else{
		var data = [];
		data.push(req.body)
		fs.writeFile('./event.json',JSON.stringify(data),function (err) {
			if (err) {
				console.log(err)
			}
			else{
				console.log("Sucessfully created file with data")
			}
		})
	}
	res.send("sucess")
});
app.post('/edit',function (req,res) {
	console.log(req.body)
	var event =require('./event.json');
	for (var i = 0; i < event.length; i++) {
		if (event[i].id==req.body.id) {
			event[i] = req.body;
		}
	}
	fs.writeFile('./event.json',JSON.stringify(event),function (err) {
		if (err) {
			console.log(err)
			res.send(err)
		}
		else{
			console.log("sucess")
			res.send("Sucess")
		}
	})
});

app.get('/events',function (req,res) {
	var events = require('./event.json');
	res.send(events);
});

module.exports = app;



