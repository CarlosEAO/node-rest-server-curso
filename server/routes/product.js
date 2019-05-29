const express = require('express');

let app = express();

const { verificaToken} = require('../middlewares/autenticacion')


let Product = require('../models/product');


///OBTENER PRODUCTOS
app.get('/product', verificaToken,(req,res)=>{
    //populate usuario y categoria
    //Paginado

    let from = req.query.from || 0;
    from = Number(from);

    Product.find({available:true})
    .skip(from)
    .limit(5)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, products)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            products
        })
    })
})

///OBTENER un solo producto
app.get('/product/:id',verificaToken, (req,res)=>{
    //populate usuario y categoria
    
    let id = req.params.id;

    Product.findById(id)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec( (err, productDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            product:productDB
        })
    })

})

///Crear PRODUCTOS
app.post('/product', verificaToken, (req,res)=>{
    let body = req.body;

    let product = new Product({
        name : body.name,
        price : body.price,
        description : body.description,
        available : body.available,
        category : body.category,
        user : req.user._id
    });

    product.save((err, productDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.status(200).json({
            ok:true,
            product:productDB
        })

    });
})


///Actualizar PRODUCTOS
app.put('/product/:id', [verificaToken], (req,res)=>{

    let id = req.params.id;

    let body = req.body;

    Product.findById(id, (err, productDB)=>{
        if(err){
            return res.status(500).json({
                ok:false, 
                err
            })
        }

        if(!productDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id no existe'
                }
            })
        }

        productDB.name = body.name;
        productDB.price = body.price;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, updatedProduct)=>{
            if(err){
                return res.status(500).json({
                    ok:false, 
                    err
                })
            }

            res.json({
                ok:true,
                product:updatedProduct
            })
        })
    })
})

///Borrar PRODUCTOS
app.delete('/product/:id', verificaToken,(req,res)=>{

    let id = req.params.id;

    Product.findById(id, (err, productDB)=>{
        if(err){
            return res.status(500).json({
                ok:false, 
                err
            })
        }

        if(!productDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id no existe'
                }
            })
        }

        productDB.available=false;
        productDB.save((err, removedProduct)=>{
            if(err){
                return res.status(500).json({
                    ok:false, 
                    err
                })
            }
    
            res.json({
                ok:true,
                removedProduct,
                message : 'Se borro el producto'
            })
        })
    })
})


//BUSCAR PRODUCTOS

app.get('/product/search/:term', verificaToken,(req, res)=>{
    let term = req.params.term;

    let regex = new RegExp(term, 'i');
    Product.find({name:regex})
    .populate('category', 'description')
    .exec((err, products)=>{
        if(err){
            return res.status(500).json({
                ok:false, 
                err
            })
        }
        res.json({
            ok:true,
            products
        })
    })
})


module.exports = app;