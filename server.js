const http = require('http');
const app = require('./app');
const cron = require('node-cron')
const creaTickets = require('./api/utilities/crea100Tickets')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// para simular actividad se generan/validan tickets
// con datos aleatorios cada cierto tiempo
//cron.schedule('00 * * * * *', () => {
    creaTickets.generaTicketsAleatorios();
    console.log('Ejecución de nuevo lote');
//});

server.listen(port);