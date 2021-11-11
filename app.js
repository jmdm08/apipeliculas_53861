/*
    IMPORTAR LOS MÓDULOS.
*/
const express = require('express');

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
const port = 3300;

/*
    INICIAR LAS RUTAS
*/
app.get("/prueba", function(request, response){
    // PROCESAR LA PETICIÓN
    let nombres = "José Miguel Dager Montoya";
    //ENVIAR LA RESPUESTA
    response.send(nombres);
});

app.get("/misiontic", function(request, response){
    response.send("Mi primer API 53861");    
});

/*
    CONFIGURAR DÓNDE EL API VA ESTAR MONITOREANDO PETICIONES.
*/
app.listen(port, function(){
    console.log("API Ejecutándose en el PUERTO " + port);
});