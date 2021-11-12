const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service');

/*
    GET -> OBTENER TODAS LAS PELÍCULAS
    GET -> OBTENER UNA PELÍCULA POR EL ID
    GET -> BUSCAR PELÍCULAS POR EL TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCUAS.
*/

controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje": "Listado de Películas",
        "data": peliculas
    });
});

module.exports = controladorPeliculas;