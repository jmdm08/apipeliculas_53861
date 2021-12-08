/*
    IMPORTAR LOS MÓDULOS.
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const basedatos = require('./database/connection');
require('dotenv').config();

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
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
    CONFIGURAR LA CARPETA PÚBLICA
*/
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", function(req, res){
    res.sendFile( path.join(__dirname+"./index.html") );
})

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