//Versión con cluster mode
const http = require('http');
const app = require('./app');
const cron = require('node-cron')
const creaTickets = require('./api/utilities/crea100Tickets')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
//----------------
const { cpus } = require('os')
const numCPUs = cpus().length
console.log("cantidad de cores: " + numCPUs);
const cluster = require('cluster');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {

    // para simular actividad se generan/validan tickets
    // con datos aleatorios cada cierto tiempo
  //  cron.schedule('00 * * * * *', () => {
        
        creaTickets.generaTicketsAleatorios();
        console.log('Ejecucion de nuevo lote');
        
   // });

    server.listen(port);
    console.log(`Process ${process.pid} started`)
}
