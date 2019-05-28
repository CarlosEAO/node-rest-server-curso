require('./config/config'); //Config solo se importa así al chile

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/index'));

//Conexión a la bd através de mongoose

mongoose.connect(process.env.URLDB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=>console.log(`db is connected`))
.catch(err=>console.log(err));

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto', process.env.PORT);
})