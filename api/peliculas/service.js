const modeloPeliculas = require('./model');

/*
    SERVICIO -> MANIPULACIÓN DE DATOS -> LÓGICA DEL NEGOCIO.
        -> RECIBE UNA ACCIÓN DESDE EL CONTRALADOR.
            -> EJECUTA LA ACCIÓN
                -> CONSULTAR DATOS AL MODELO
                -> REALIZAR OPERACIONES MATEMÁTICAS, LÓGICAS CON LOS DATOS.
        -> ENVÍA LOS RESULTADOS DE LA ACCIÓN AL CONTROLADOR.
*/

async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.buscarTodos();
    return peliculas;
}

async function obtenerPelicula(id){
    // VALIDAR QUE EL ID NO SEA NULO, UNDEFINED O VACÍO
    if(id.length == 24){
        let pelicula = await modeloPeliculas.buscarPorId(id);
        if(pelicula){
            return pelicula;
        }
        else{
            return "ID no existe en la base de datos";
        }
    }
    else{
        return "Ingrese por favor un ID"
    }    
}

async function buscarPeliculasTitulo(nombre)
{
    let peliculas=await modeloPeliculas.buscarPorTitulo(nombre);
    return peliculas;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.buscarPeliculasTitulo=buscarPeliculasTitulo;