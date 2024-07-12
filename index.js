const express = require("express");
const dotenv = require("dotenv");
const { parseCSV } = require("./controllers/parserController");

const app = express();
app.use(express.json());
dotenv.config();

app.post("/parser", parseCSV);

console.log("CICD Testing...");
console.log("Testing");
console.log("K8s Testing");
console.log("Pods Recreate testing")

app.listen(2000, () => {
    console.log(`Listening on port ${2000}...!`);
});