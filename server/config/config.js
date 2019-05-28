// ================================================================
// En este caso el ambiente de "produccion" es heroku,
// ahí se configuran las variables de process.env
// =============================================

// PUERTO (Ya nos la dan)

process.env.PORT = process.env.PORT || 3000;

//ENTORNO (Ya nos la dan)

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BASE DE DATOS

let urlDB;

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = process.env.MONGO_URI //Esta sí la configuramos
}

process.env.URLDB = urlDB;

//VENCIMIENTO TOKEN
process.env.EXPIRATION_TOKEN = 60*60*24*30;

//SEED DE AUTENTICACIÓN, esta también la configuramos en heroku

process.env.SEED = process.env.SEED || 'seedDesarrollo';


/// ESTE ARCHIVO NO TIENE NINGUN EXPORT PORQUE NO HAY FUNCIONES