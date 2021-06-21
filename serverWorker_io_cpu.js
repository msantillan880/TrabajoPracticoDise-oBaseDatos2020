const { Worker } = require("worker_threads");
const { cpus } = require('os')
const numCPUs = cpus().length
let num = 50;

//Create new worker
const worker1 = new Worker("./worker.js", { workerData: { num: num } });
const worker2 = new Worker("./server.js");

for (let index = 1; index <= numCPUs; index++) {
  //Listen for a message from worker
  worker1.once("message", result => {
    console.log(`${num}th Fibonacci Number: ${result}`);
  });

  worker1.on("error", error => {
    console.log(error);
  });

  worker1.on("exit", exitCode => {
    console.log(exitCode);
  })

  //-----------

  worker2.once("message", result2 => {
    console.log("Generacion del lote");
  });

  worker2.on("error", error => {
    console.log(error);
  });

  worker2.on("exit", exitCode => {
    console.log(exitCode);
  })

  console.log("Creacion de numero de lote y procesamiento" + index);

}

