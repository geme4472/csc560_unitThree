var mongoose = require('mongoose');

/* Define Models */
//Create schema for kitty collection
var playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    rushingYards: Number,
    passTDs: Number,
    catchesMade: Number,
    missedFG: Number,
    sacks: Number
})

//No indexes on players
//playerSchema.index({name : 1}, {unique:true});

//Create methods for/from schema
playerSchema.methods.whatIsMyName = function () {
    var greeting = "Hello, my name is " + this.firstName + ' ' + this.lastName
    //console.log(greeting);
}

playerSchema.methods.saveMsg = function () {
    return this.firstName + ' ' + this.lastName + ' saved'
    //console.log(this.firstName + ' ' + this.lastName + ' saved')
}   

playerSchema.methods.delMsg = function () {
    return this.firstName + ' ' + this.lastName + ' deleted'
    //console.log(this.firstName + ' ' + this.lastName + ' deleted')
}  

playerSchema.methods.updateMsg = function () {
    return this.firstName + ' ' + this.lastName + ' updated'
    //console.log(this.firstName + ' ' + this.lastName + ' updated')
}   

//Coup de gras: Model name = collection name
//DEV: module.exports = mongoose.model('playas', playerSchema) 
module.exports = mongoose.model('players', playerSchema) 
