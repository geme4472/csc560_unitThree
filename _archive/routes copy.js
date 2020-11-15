var express     = require('express');
var mongoose    = require('mongoose');

exports.kittenAPIRouter = function(app, mongoose){

    //Create schema for kitty collection
    var kittenSchema = new mongoose.Schema({
        name: String,
        color: String,
    })

    //Add an index to the schema
    kittenSchema.index({name : 1}, {unique:true});

    //Create methods for/from schema
    kittenSchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }

    kittenSchema.methods.saveMsg = function () {
        console.log(this.name + ' saved');
    }    

    var KittenModel = mongoose.model('Kitten', kittenSchema)

    /**  ROUTES  **/
    var router = express.Router()

    /* GET
    app.get('/*', function(req, res, next) {
        res.contentType('application/json');
        next();
    });*/

    router.get('/', function(req, res){
        res.end('you have reached the api')
    })

    router.get('/kittenAdd', function(req, res){
        console.log(req.params)

        if(!req.query.name){
            var errStr = "No kitten name given"
            res.status = 400
            res.json({ error: errStr })
            console.log(errStr)
            return;
        }else{
            var newKitten = new KittenModel({
                name: req.query.name,
                color: req.query.color
            })
            newKitten.save(function(err, obj){
                if(err){
                    res.end("new kitten save err. Duplicate name")
                }else{
                    res.status(201)
                    res.json(obj)
                }
            })
        }
    })

    app.use('/api', router);
}