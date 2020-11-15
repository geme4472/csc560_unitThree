var express     = require('express')
var mongoose    = require('mongoose')
var dbconn      = require('./config/db')
var routes      = require('./routers/routes')

//Init server
var app = express()
console.log('init express')

//Connect to DB
//mongoose.connect(dbconn.url, {useNewUrlParser: true} )
mongoose.connect(dbconn.url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true });
mongoose.set('debug', true); //not sure what this does. verbosity?
mongoose.connection.on('error', err => { console.log(err) })

//All of our routers
routes.playerAPIRouter(app, mongoose)

//Setup server on 8081
var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    //console.log(server.address())
    console.log("Example app listening at http://%s:%s", host, port)
})