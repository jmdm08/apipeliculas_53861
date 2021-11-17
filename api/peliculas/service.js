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

async function buscarPeliculasTitulo(nombre, exacta = false){
    let peliculas=await modeloPeliculas.buscarPorTitulo(nombre, exacta);
    return peliculas;
}

async function crearPelicula(pelicula){
    /*
        pelicula = {
            "titulo" : "The Godfather",
            "generos" : ["A", "B"]
        }
    */
    let resultado = {};
    // pelicula -> null, undefined 
    // Objeto vacío -> longitud es 0 -> conocer sus llaves.
    if(pelicula && Object.keys(pelicula).length > 0 ){
        if(pelicula.titulo && pelicula.titulo !== ""){
            let busqueda = await buscarPeliculasTitulo(pelicula.titulo, true);
            if(busqueda.length === 0){
                let crearResultado = await modeloPeliculas.crearUna(pelicula);
                /*
                    {
                        "acknowledged" : true/false,
                        "insertedId" : id/null
                    }
                */
                if(crearResultado && crearResultado.acknowledged){
                    resultado.mensaje = "Película Creada Exitosamente";
                    resultado.datos = crearResultado;
                }else{
                    resultado.mensaje = "Error al crear Película";
                    resultado.datos = pelicula;
                }
            }else{
                resultado.mensaje = "Película ya existe";
                resultado.datos = pelicula.titulo;
            }
        }else{
            resultado.mensaje = "Título no existe o vacío";
            resultado.data = pelicula;
        }
    }else{
        resultado.mensaje = "No hay datos para insertar";
    }

    return resultado;
}

async function actualizarPelicula(id, nuevosDatos){
    /*
        1. Longitud es exactamente igual a 24 -> .length
        2. 0-9 y A-F -> /^[0-9A-F]+$/i
    */
    let resultado = {}
    if(id.length == 24 && /^[0-9A-F]+$/i.test(id)){
        // TODO: VALIDAR LOS NUEVOS DATOS.
        let actualizarResultado = await modeloPeliculas.actualizarUna(id, nuevosDatos);
        if(actualizarResultado && actualizarResultado.acknowledged){
            resultado.mensaje = "Película actualizada correctamente";
            resultado.datos = actualizarResultado;
        }
        else{
            resultado.mensaje = "Error al actualizar película";
            resultado.datos = {"id":id, "datos": nuevosDatos};
        }
    }
    else{
        resultado.mensaje = "ID inválido";
        resultado.datos = id;
    }
    return resultado;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.buscarPeliculasTitulo=buscarPeliculasTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;