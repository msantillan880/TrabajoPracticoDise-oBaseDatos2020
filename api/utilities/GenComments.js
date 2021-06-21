const faker = require('faker');
const uuid = require('uuid');

function creaComments() {
    return {
        id: uuid.v4(),
        whoComment: faker.random.arrayElement(["Auditoria", "Farmacia Caronte", "Dpto Legal", "Dr Ceres Pedro"]),
        textBody: faker.random.arrayElement(["Ticket ilegible", "Correccion invalida", "Revise fechas", "Aplica codigo 25040"]),
        dateComment: faker.time.recent()
    }
}

module.exports.creaComments = creaComments;
