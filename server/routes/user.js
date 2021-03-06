const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion')

//HASTA AQUÍ SOLO IMPORTAMOS COSAS MAMALONAS

app.get('/', function(req, res){
    res.json('Hello world');
});

app.get('/usuario', verificaToken ,function(req, res){

    let from = req.query.from || 0;
    let limit = req.query.limit || 5;

    from = Number(from);
    limit = Number(limit);
    User.find({status:true}, 'name email role status google img')
    .skip(from)
    .limit(5)
    .exec((err, users)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        User.count({status:true},(err, count)=>{
            res.json({
                ok:true,
                users,
                count
            });
        })

        
    });
});

app.post('/usuario', [verificaToken, verificaAdminRole],function(req, res){
    let body = req.body;

    let user = new User({
        name : body.name,
        email : body.email,
        password : bcrypt.hashSync(body.password,10),
        role : body.role
    });

    user.save((err, userDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            user:userDB
        })

    });

});

app.put('/usuario/:id',[verificaToken, verificaAdminRole], function(req, res){
    let id = req.params.id;

    let body = _.pick( req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body,{new:true,runValidators:true} ,(err, userDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            user: userDB
        });
    });
});

app.delete('/usuario/:id',[verificaToken, verificaAdminRole], function(req, res){

    let id = req.params.id;

    let changeStatus={
        status:false
    };

    User.findByIdAndUpdate(id, changeStatus,{new:true},(err, removedUser)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if(!removedUser){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'User not found'
                }
            })
        }
        res.json({
            ok:true,
            user:removedUser
        });
    });

    //FISICA
    /*User.findByIdAndRemove(id, (err, removedUser)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(!removedUser){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'User not found'
                }
            })
        }
        res.json({
            ok:true,
            user:removedUser
        })

    });*/
});


module.exports = app;