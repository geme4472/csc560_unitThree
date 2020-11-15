var mongoose    = require('mongoose');
var dbconn      = require('./config/db');
var routes      = require('./routes');

console.log(dbconn.url)
mongoose.connect(dbconn.url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    kittyCreator()    
});

var kittyCreator = function(){
    //Create schema
    const kittySchema = new mongoose.Schema({
        name: String
    });
    
    //Create method from schema
    kittySchema.methods.speak = function () {
        const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
        console.log(greeting);
    }
    kittySchema.methods.saveMsg = function () {
        console.log(this.name + ' saved');
    }

    const Kitten = mongoose.model('Kitten', kittySchema);

    /*const silence = new Kitten({ name: 'Silence' });    
    const fluffy = new Kitten({ name: 'fluffy' });
    
    fluffy.save(function (err, obj) {
        if (err) return console.error(err);
        obj.saveMsg();
    });

    silence.save(function (err, obj) {
        if (err) return console.error(err);
        obj.saveMsg();
    })*/

    var phil = new Kitten({ name:"phil" })
    phil.save(function(){
        
        Kitten.find(function (err, kittens) {
            if (err) return console.error(err);
            console.log(kittens);
        })
    });

}
