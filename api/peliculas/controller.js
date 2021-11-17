const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service');

/*
    GET -> OBTENER TODAS LAS PELÍCULAS - OK
    GET -> OBTENER UNA PELÍCULA POR EL ID
    GET -> BUSCAR PELÍCULAS POR EL TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCUAS.
*/

/*
    CONTROLADOR -> ENTRADA/SALIDA AL SISTEMA
        -> RECIBE DATOS DE ENTRADA -> REQUEST.
        -> ENVÍA AL SERVICIO LAS ENTRADAS.
        -> RECIBE DEL SERVICIO DATOS TRANSFORMADOS.
        -> ENVÍA RESPUESTA AL CLIENTE.
*/

/**
 * CONTROLADOR PARA BUSCAR TODAS LAS PELÍCULAS...
 */
controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje": "Listado de Películas",
        "data": peliculas
    });
});

/**
 * CONTROLADOR PARA BUSCAR UNA PELÍCULA POR ID
 */
controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Detalle de la película",
        "data" : pelicula
    });
})

/**
 * CONTROLADOR PARA BUSCAR PELÍCULAS POR NOMBRE 
 */
controladorPeliculas.get("/buscarPeliculasTitulo/:nombre",async function(req,res){
    let nombre = req.params.nombre;
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(nombre);
    res.send(
        {
            "mensaje": "Resultado de busqueda",
            "busqueda": nombre,
            "datos": peliculas
        }
    );
})

controladorPeliculas.post("/crearPelicula", async function(req, res){
    /*
        body = {
            "titulo" : "The Godfather",
            "generos" : ["A", "B"]
        }
    */
    let pelicula = req.body;
    let resultado = await servicioPeliculas.crearPelicula(pelicula);
    res.send(resultado);
});

/*
    id -> Parámetros
    nuevosDatos -> Body
*/
controladorPeliculas.put("/actualizarPelicula/:id", async function(req, res){
    let id = req.params.id;
    let nuevosDatos = req.body;
    let resultado = await servicioPeliculas.actualizarPelicula(id,nuevosDatos);
    res.send(resultado);
})


module.exports = controladorPeliculas;