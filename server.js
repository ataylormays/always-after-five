var express = require('express'),
app = express();

app.get('/', function(req, res){
	res.sendFile(__dirname + '/modules/drinks/views/html/index.html');
})

//middleware
app.use('/node_mods/', express.static(__dirname + '/node_modules/'));
app.use('/controllers/', express.static(__dirname + '/modules/drinks/controllers/'));
app.use('/html/', express.static(__dirname + '/modules/drinks/views/html/'));
app.use('/css/', express.static(__dirname + '/modules/drinks/views/css/'));
app.use('/img/', express.static(__dirname + '/modules/drinks/views/img/'));

var port = 3030;
app.listen(port, function(){
	console.log('Listening on port ' + port.toString() + '...');
})