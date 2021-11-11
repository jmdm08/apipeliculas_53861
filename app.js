/*
    IMPORTAR LOS MÓDULOS.
*/
const express = require('express');
const bodyParser = require('body-parser');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3300;

/*
    INICIAR LAS RUTAS
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/*
    CONFIGURAR DÓNDE EL API VA ESTAR MONITOREANDO PETICIONES.
*/
app.listen(port, function(){
    console.log("API Ejecutándose en el PUERTO " + port);
});