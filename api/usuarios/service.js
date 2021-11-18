const bcrypt = require('bcrypt');
require('dotenv').config();
const modeloUsuarios = require('./model');

async function crearUsuario(nuevoUsuario){
    let resultado = {};
    if(nuevoUsuario && nuevoUsuario.usuario && nuevoUsuario.clave && Object.keys(nuevoUsuario).length > 0){
        
        let contrasenaEncriptada = bcrypt.hashSync(nuevoUsuario.clave, parseInt(process.env.ENC_SALT_ROUNDS));
        nuevoUsuario.clave = contrasenaEncriptada;
        
        let resultadoCrear = await modeloUsuarios.crearUno(nuevoUsuario);
       
        if(resultadoCrear && resultadoCrear.acknowledged){
            resultado.mensaje = "Usuario creado correctamente";
            resultado.datos = resultadoCrear;
        }
        else{
            resultado.mensaje = "Error al crear usuario";
            resultado.datos = nuevoUsuario;
        }
    }
    else{
        resultado.mensaje = "Datos inválidos";
        resultado.datos = nuevoUsuario;
    }

    return resultado;
}

/*
    usuario = {
        "usuario" : "xxxx",
        "clave" : "xxxx"
    }
*/
async function iniciarSesion(usuario){
    let resultado = {};
    if(usuario && usuario.usuario && usuario.clave && Object.keys(usuario).length > 0){
        let busquedaUsuario = await modeloUsuarios.buscarPorUsuario(usuario.usuario);
        if(busquedaUsuario){
            let contrasenaEncriptada = busquedaUsuario.clave;
            let esValida = bcrypt.compareSync(usuario.clave, contrasenaEncriptada);
            if(esValida){
                resultado.mensaje = "Inicio de sesión correcto";
                delete busquedaUsuario.clave;
                resultado.datos = busquedaUsuario;
            }
            else{
                resultado.mensaje = "Contraseña inválida";
                resultado.datos = usuario;
            }
        }
        else{
            resultado.mensaje = "Usuario no existe";
            resultado.datos = usuario;
        }    
    }
    else{
        resultado.mensaje = "Datos inválidos";
        resultado.datos = usuario; 
    }
    return resultado;
}

module.exports.crearUsuario = crearUsuario;
module.exports.iniciarSesion = iniciarSesion;