// PUERTO

process.env.PORT = process.env.PORT || 3000;

//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BASE DE DATOS

let urlDB;

if(process.env.NODE_ENV == 'dev'){
     urlDB = 'mongodb://localhost:27017/cafe';
 }
 else{
    urlDB='mongodb+srv://Carlos_Aranda:3Pf1ndNXiltyqIjC@cluster0-w6qpu.gcp.mongodb.net/cafe?retryWrites=true';
}

process.env.URLDB = urlDB;



