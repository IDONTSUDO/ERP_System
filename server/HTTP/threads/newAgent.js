// Access the workerData by requiring it.
const { parentPort, workerData } = require("worker_threads");
 
// Something you shouldn"t run in main thread
// since it will block.
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
 
// Main thread will pass the data you need
// through this event listener.
parentPort.on("message", (param) => {
  if (typeof param !== "number") {
    throw new Error("param must be a number.");
  }
  const result = fib(param);
 
  // Access the workerData.
  console.log("workerData is", workerData);
 
  // return the result to main thread.
  parentPort.postMessage(result);
});