const {Worker} = require("worker_threads");
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
//----------------
//const creaTickets = require('./api/utilities/crea50Tickets')
function pruebaWorker() {
  let num = 50;


//Create new worker
const worker = new Worker("./worker.js", {workerData: {num: num}});

//Listen for a message from worker
worker.once("message", result => {
  console.log(`${num}th Fibonacci Number: ${result}`);
});

worker.on("error", error => {
  console.log(error);
});

worker.on("exit", exitCode => {
  console.log(exitCode);
})

console.log("Executed in the parent thread");
}

pruebaWorker();
console.log('Ejecución de Worker Threads');


server.listen(port);