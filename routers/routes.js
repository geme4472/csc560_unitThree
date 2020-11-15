var express     = require('express');
//var KittenModel = require('../models/KittenModel')  //From mongoose tutorial
var PlayerModel = require('../models/PlayerModel')

exports.playerAPIRouter = function(app, mongoose){
    //Using first/last as 
    var validateFirstLast = function(req, res){ //console.log(req)
        if(!req.query.firstName || !req.query.lastName){
            var errStr = "First and last name required: " + req.query.firstName + ' ' +  req.query.lastName
            res.status = 400
            //res.json({ error: errStr }) - let's show the user some non-json, eh?
            console.log(errStr)
            res.end(errStr)
            return;
        }
    }

    /**  ROUTES  **/
    var router = express.Router()

    /* GETs, set cType - but we're going to kick out other types, so... 
    app.get('/*', function(req, res, next) {
        res.contentType('application/json')
        next()
    });*/

    router.get('/', function(req, res){
        res.set('Content-Type', 'text/html')
        var msg = 'firstName, lastName, rushingYards, passTDs, catchesMade, missedFG, sacks.';
        msg += '<br><br>Players can be added and updated via the HTTP method of POST.  They can be deleted via DELETE.  Players can be queried via GET.'
        msg += '<br><br>Queries for the following stats are available.  Note the parameter names in parens:<br>most passing TDS (tdMax)<br>'
        msg += 'most sacks (sackMax)<br> most rushing yards (rushMax)<br> least rushing yards (rushMin)<br>'
        msg += 'missed field goals (fgMax)<br> most passing yards (passMax)'
        msg += 'do not specify any parameters to get a full payer roster'
        res.end('<h3>Welcome to the football player api. You have the following parameters upon which to query:</h3>'+msg)
    })

    /*** NOT NEEDED FOR HOMEWORK!!! *** From kitten example code UNNEEDED for unit3
    router.get('/kittenAdd', function(req, res){
        //console.log(req.params)

        if(!req.query.name){
            var errStr = "No kitten name given"
            res.status = 400
            res.json({ error: errStr })
            console.log(errStr)
            return;
        }else{
            var newKitten = new KittenModel({
                name: req.query.name,
                color: req.query.color,
                lives: req.query.lives
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
    })*/

    //ADD NEW PLAYER: first/last required
    router.post('/player/add', function(req, res){
        validateFirstLast(req, res)

        var newPlayer = new PlayerModel({
            firstName:      req.query.firstName,
            lastName:       req.query.lastName,
            rushingYards:   req.query.rushingYards,
            passTDs:        req.query.passTDs,
            catchesMade:    req.query.catchesMade,
            missedFG:       req.query.missedFG,
            sacks:          req.query.sacks
        })
        newPlayer.save(function(err, obj){
            if(err){
                res.end("New player save error.")
            }else{
                res.status(201)
                res.json(obj)
            }
        })
    })

    //UPDATE
    router.post('/player/update', function(req, res){
        validateFirstLast(req, res)

        PlayerModel.findOneAndUpdate(
            { 
                firstName:  req.query.firstName, 
                lastName:   req.query.lastName 
            }, 
            { 
                rushingYards:   req.query.rushingYards,
                passTDs:        req.query.passTDs,
                catchesMade:    req.query.catchesMade,
                missedFG:       req.query.missedFG,
                sacks:          req.query.sacks
            },
            {upsert : true},
            function(err, obj){
                if(err){
                    res.end("Update error. Player not updated.")
                }else{
                    res.status(201)
                    res.end("Player updated")
                }
            }
        ) 
    })    

    //DELETE
    router.delete('/player/delete', function(req, res){
        validateFirstLast(req, res)

        PlayerModel.deleteOne(
            { firstName:req.query.firstName, lastName:req.query.lastName }, 
            function(err, obj){
                if(err){
                    res.end("Delete error. Player not deleted.")
                }else{
                    res.status(201)
                    res.end("Player deleted")
                }
            }
        )
    })   
    
    router.get('/player/query', function(req, res){
        //Need: 1) Most touchdown passes, 2) Most rushing yards, 3) least rushing yards
        //4) list of players sorted most->fewest FGs, 5) most sacks
        var qry = {};
        var sort = { lastName: 1 };
        var limit = 1;

        if(req.query.op == 'tdMax'){
            sort = { passTDs: -1 }
        }else if(req.query.op == 'rushMax'){
            sort = { rushingYards: -1 }
        }else if(req.query.op == 'rushMin'){
            qry = { rushingYards: { $exists: true, $ne: null } }
            sort = { rushingYards: 1 }
        }else if(req.query.op == 'fgMax'){
            sort = { missedFG: -1 }
        }else if (req.query.op == 'sackMax'){
            sort = { sacks: -1 }
        }else if (req.query.op == 'passMax'){
            sort = { passTDs: -1 }
        }else{
            limit = 100
        }

        var found = PlayerModel.find(qry, function(err,docs){
            res.status(200).json(docs)
        })
        .sort(sort)
        .limit(limit)
    })

    app.use('/api/v1.1', router);
}