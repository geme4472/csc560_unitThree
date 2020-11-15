var mongoose = require('mongoose');

/* Define Models */
//Create schema for kitty collection
var kittenSchema = new mongoose.Schema({
    name: String,
    color: String,
    lives: Number
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

//Coup de gras: Model name = collection name
module.exports = mongoose.model('kittens', kittenSchema) 
