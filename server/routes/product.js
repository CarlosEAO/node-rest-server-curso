const express = require('express');

let app = express();

const { verificaToken} = require('../middlewares/autenticacion')


let Producto = require('../models/product');


///OBTENER PRODUCTOS
app.get('/products', (req,res)=>{
    //populate usuario y categoria
    //Paginado
})

///OBTENER un solo producto
app.get('/products/:id', (req,res)=>{
    //populate usuario y categoria
    //Paginado
})

///Crear PRODUCTOS
app.post('/products', (req,res)=>{
})


///Actualizar PRODUCTOS
app.put('/products/:id', (req,res)=>{
})

///Borrar PRODUCTOS
app.delete('/products/:id', (req,res)=>{
})


module.exports = app;