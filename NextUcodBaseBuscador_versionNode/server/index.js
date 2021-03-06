var bodyParser  = require('body-parser'),
    http        = require('http'),
    express     = require('express')

let jsonData = require('./data.json');

var port    = port = process.env.PORT || 3000,
    app     = express(),
    Server  = http.createServer(app)

    app.use('/',express.static('public'))

    app.get('/casas/', function (req, res) {
        res.send(jsonData)   
    })


    app.listen(port, function(){
        console.log ("server is running on port: "+port)

        
    })


 