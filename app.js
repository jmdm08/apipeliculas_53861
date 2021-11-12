/*
    IMPORTAR LOS MÓDULOS.
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const basedatos = require('./database/connection');
require('dotenv').config();

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));
const port = process.env.PORT;

/*
    INICIAR LAS RUTAS
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/*
    CONFIGURAR DÓNDE EL API VA ESTAR MONITOREANDO PETICIONES.
*/
basedatos.conectar()
    .then(function(){
        app.listen(port, function(){
            console.log("API Ejecutándose en el PUERTO " + port);
        });
    })
    .catch(function(error){
        console.log("Se presentó un error al conectar a la BASE DE DATOS");
        console.log(error);
    });