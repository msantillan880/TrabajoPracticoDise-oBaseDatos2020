const creaFakeTicket = require('./GenTicket')
const asyncForLoop = require('./asyncforloop')
const fs = require('fs')
const uuid = require('uuid');


const CARPETA_ARCHIVOS = './public/files/creados'

// _.defer()
function generaTicketsAleatorios() {
    asyncForLoop(100, (numeroDeIteracion, next) => {
        let objFake = creaFakeTicket.creaTicket();
        console.log("Objeto creado: " + objFake);
        //  let nameJson = uuid.v4();
        let nameJson = objFake.idPrestador + "-" + objFake.apyn + "-" + objFake._id;
        let nombreArchivo = [CARPETA_ARCHIVOS, '/', nameJson, '.json'].join('')
        fs.writeFile(nombreArchivo, JSON.stringify(objFake), 'utf8', (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(['escribiendo', nombreArchivo].join(' '))
            next()
        })
    })
}

module.exports.generaTicketsAleatorios = generaTicketsAleatorios;