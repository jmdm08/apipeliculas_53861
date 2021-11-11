const express = require('express');
const controladorPeliculas = express.Router();

/*
    GET -> OBTENER TODAS LAS PELÍCULAS
    GET -> OBTENER UNA PELÍCULA POR EL ID
    GET -> BUSCAR PELÍCULAS POR EL TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCUAS.
*/

controladorPeliculas.get("/obtenerPeliculas", function(req, res){
    // CAPTURAR LOS DATOS Y ENVIARLOS AL SERVICIO
    res.send("Listado de películas...");
});

module.exports = controladorPeliculas;