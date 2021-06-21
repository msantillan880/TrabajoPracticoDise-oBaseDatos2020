const faker = require('faker');
const uuid = require('uuid');
const Compare = require("./compare");
const Ticket = require("../models/ticket");
const Comment = require("../models/comment");

function fakeValues() {
    return {
        id: uuid.v4(),
        apyn: faker.name.lastName() + " " + faker.name.firstName(),
        nroAfiliado: faker.finance.account(),
        diagnostico: faker.random.arrayElement(["asma", "dislipemia", "herpes"]),
        idPrestador: faker.random.arrayElement(["10001", "10002", "10003", "10004"]),
        prestacion: faker.random.arrayElement(["lopid ud,genfibrozil", "sinlip", "asmabron", "asmavitan", "aciclovir", "herpial"]),
        fechaCreacion: faker.time.recent()
    }
}

function creaTicket(){
const _xticket = fakeValues()
const _Ticket = new Ticket({
    id: _xticket.id,
    apyn: _xticket.apyn,
    nroAfiliado: _xticket.nroAfiliado,
    diagnostico: _xticket.diagnostico,
    idPrestador: _xticket.idPrestador,
    prestacion: _xticket.prestacion,
    fechaCreacion: _xticket.fechaCreacion
});
Compare._compare(_Ticket.diagnostico, _Ticket.prestacion, _Ticket)
    .then(rptax => {
       // console.log("rptax: " + rptax);
       // console.log("_Ticket: " + _Ticket);
        _Ticket
            .save()
            .then(result => {
                console.log("gen result: " + result);
               
            })
            .catch(err => {
                console.log(err);
                
            });
    });
    return _Ticket;
}
// perdon si no pongo acento en todo, es por prevencion

module.exports.creaTicket = creaTicket;