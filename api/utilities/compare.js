// funcion compare:
// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript

//
// https://es.stackoverflow.com/questions/255432/la-consola-muestra-promise-pending-al-momento-de-usar-async-await-en-node
const mongoose = require('mongoose');

const db = require("../../db")
mongoose.connect(db.URL_BASE_DE_DATOS);
var Med = require('../models/medicine')
var _ticket = require('../models/ticket')
var Comment = require('../models/comment')


const _compare = async function (_diagnostic, _prestacion, _ticket) {

    
    arr1 = _prestacion.split(",");
    console.log(arr1);

    const arr = await Med.find({ diagnostico: _diagnostic }, { 'medicinaArray': 1, '_id': 0 }, function (err, arr2) {
        if (err) {
            console.log(err);
        }
        else {
            arr3 = String(arr2);
            console.log("rpta find: " + arr2)
            arr4 = arr3.substring(16, arr3.length - 2);
            //https://www.samanthaming.com/tidbits/83-4-ways-to-convert-string-to-character-array/
            Object.assign([], arr4); // convierte a array
            
            let difference = arr1.filter(x => !arr4.includes(x));

            console.log(difference)
            
            if (difference.length !== 0) {
                _ticket.comments =(new Comment({
                    whoComment: "Checkmed",
                    textBody: " Verifique la medicacion, por favor",
                    dateComment: new Date()

                }))
              
            }
            console.log(difference.length);
           
            return _ticket
        }

    })


}

module.exports._compare = _compare