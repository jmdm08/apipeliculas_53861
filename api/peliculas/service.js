const modeloPeliculas = require('./model');

async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.findAll();
    return peliculas;
}

module.exports.obtenerPeliculas = obtenerPeliculas;