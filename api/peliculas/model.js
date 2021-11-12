const basedatos = require('../../database/connection');

function findAll(){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").find({}).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.findAll = findAll;