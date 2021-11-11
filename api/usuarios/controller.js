const express = require('express');
const controladorUsuarios = express.Router();

/*
    GET -> LOGIN
    GET -> OBTENER USUARIO POR ID
*/

controladorUsuarios.get("/iniciarSesion", function(req, res){
    let datos = req.query;
    res.send("Los datos del usuarios son: \n" + datos.usuario + " " + datos.contrasena)
});

module.exports = controladorUsuarios;