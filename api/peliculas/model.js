const basedatos = require('../../database/connection');
const objectId = require('mongodb').ObjectId;

/*
    MODELO -> GESTIONA LA BASE DE DATOS.
        -> REALIZA CONSULTAS DE LOS DATOS A PETICIÓN DE LOS SERVICIOS.
            -> LECTURA -> SELECCIONA
            -> ESCRIBE
            -> ACTUALIZA
            -> ELIMINA
*/

function buscarTodos(){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").find({}).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

function buscarPorId(id){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").findOne({"_id": objectId(id) })
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

function buscarPorTitulo(nombre)
{
    let db=basedatos.obtenerConexion();
    // /man/i -> RegExp -> patron = nombre modificador -> i
    return db.collection("peliculas").find({"titulo": new RegExp(nombre,"i")}).toArray()
    .then(function(datos){
        return datos;
    })
    .catch(function(error){
        console.log(error);
    });
}

module.exports.buscarTodos = buscarTodos;
module.exports.buscarPorId = buscarPorId;
module.exports.buscarPorTitulo=buscarPorTitulo;