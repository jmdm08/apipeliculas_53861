const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let basedatos;

const conectar = function(){
    return new Promise(function(resolve, reject){
        if(basedatos){
            resolve();
        }
        else{
            mongoClient.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
                .then(function(conexion){
                    basedatos = conexion.db(process.env.MONGODB_DB);
                    resolve();
                })
                .catch(function(error){
                    reject(error);
                });
        }
    });
}

const obtenerConexion = function(){
    return basedatos;
}

module.exports = {conectar, obtenerConexion}