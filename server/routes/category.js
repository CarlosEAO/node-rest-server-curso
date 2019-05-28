const express = require('express');

let {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

let app = express();

let Category = require('../models/category');

//MOSTRAR TODAS LAS CATEGORIAS

app.get('/category', (req,res)=>{

});

//MOSTRAR UNA CATEGORÍA POR ID

app.get('/category/:id', (req, res)=>{
    Category.findById();
});

//CREAR NUEVA CATEGORIA

app.post('/category', verificaToken, (req, res)=>{
    //regresa la nueva categoría
})

//Actualizar categoria

app.put('category/:id', (req, res)=>{

});


//Eliminar categoria

app.delete('category/:id', [verificaToken, verificaAdminRole],(req,res)=>[
])