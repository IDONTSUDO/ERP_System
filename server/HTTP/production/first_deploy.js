require("dotenv").config();
const mongoose = require("mongoose");
const process = require("process");
const fs = require("fs");
const path = require("path");
const RUSSIA = require("../database/Helper/RussiaSiti");

if (process.env.PROD === "true") {
  mongoose
    .connect(`mongodb://localhost/${process.env.DATABASE}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      poolSize: 10
    })
    .then(() =>
      console.log(`Server connect to Database ${process.env.DATABASE}`)
    );
  mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
    process.exit(-1);
  });

  if (`${process.env.DEBUG_Mode}` === "true") {
    mongoose.set("debug", true);
  }
  var BUFFER = bufferFile("./russia.json");

  function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath)); // zzzz....
  }

  let Map = JSON.parse(BUFFER.toString());

  MapIntegtation(Map);
} else {
  console.log("please settings .env");
  process.exit(-1);
}

async function MapIntegtation(Map) {
  for await (let i of Map) {
    let rus = new RUSSIA(i);
    rus.save();
  }
}
