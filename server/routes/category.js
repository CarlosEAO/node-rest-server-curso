const express = require('express');

let {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

let app = express();

let Category = require('../models/category');

//MOSTRAR TODAS LAS CATEGORIAS

app.get('/category', verificaToken, function(req,res){

    Category.find({})
    .populate('user')
    .sort('description')
    .exec((err, categoriesDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categories:categoriesDB
        })
    })
});

//MOSTRAR UNA CATEGORÍA POR ID

app.get('/category/:id', (req, res)=>{

    let id = req.params.id;
    Category.findById(id, (err, categorieDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(!categorieDB){
            return res.status(500).json({
                ok:false,
                err:{
                    message: 'El id no existe'
                }
            })
        }

        res.json({
            ok:true,
            categorie:categorieDB
        })
    })
});

//CREAR NUEVA CATEGORIA

app.post('/category', verificaToken, (req, res)=>{
    //regresa la nueva categoría
    let body = req.body;

    let category = new Category({
        description : body.description,
        user : req.user._id
    });

    category.save((err, categoryDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            category:categoryDB
        })

    });
})

//Actualizar categoria

app.put('/category/:id', (req, res)=>{
    let id = req.params.id;

    let body = req.body;

    let update = {
        description : body.description
    }

    Category.findByIdAndUpdate(id, update, {new:true, runValidators:true}, (err, categoryDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            category:categoryDB
        })
    })

});


//Eliminar categoria

app.delete('/category/:id', [verificaToken, verificaAdminRole],(req,res)=>{
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            messsage:'Categoria borrada'
        })
    })
})

module.exports = app;