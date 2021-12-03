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

    /*
        TODO: PAGINACIÓN
            -> limit()
            -> skip()
    */

    return db.collection("peliculas").find({}).limit(100).toArray()
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

function buscarPorTitulo(nombre, exacta){
    let db=basedatos.obtenerConexion();
    // /man/i -> RegExp -> patron = nombre modificador -> i
    let busqueda;

    if(exacta){
        busqueda = nombre;
    }
    else{
        busqueda = new RegExp(nombre,"i");
    }

    return db.collection("peliculas").find({"titulo": busqueda}).toArray()
    .then(function(datos){
        return datos;
    })
    .catch(function(error){
        console.log(error);
    });
}

function crearUna(pelicula){
    let db = basedatos.obtenerConexion();
    /*
        db.peliculas.insertOne(
            {
                "titulo" : "The Godfather",
                "generos" : ["A", "B"]
            }
        )
    */
    return db.collection("peliculas").insertOne(pelicula)
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

function actualizarUna(id, nuevosDatos){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").updateOne(
            {"_id":objectId(id)}, // Filtro
            {"$set":nuevosDatos} // Operación de actualización --- $set, $unset 
        )
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

function eliminarUna(id){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").deleteOne({"_id":objectId(id)})
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.buscarTodos = buscarTodos;
module.exports.buscarPorId = buscarPorId;
module.exports.buscarPorTitulo=buscarPorTitulo;
module.exports.crearUna = crearUna;
module.exports.actualizarUna = actualizarUna;
module.exports.eliminarUna = eliminarUna;