let fs = require("fs");
let readline = require("readline-sync");
debugger;
let records= JSON.parse(fs.readFileSync("records.json").toString());
let fn = readline.question("Enter your first name: ");
let ln = readline.question("Enter your last name: ");
let gender = readline.question("Enter your gender: ");
let em = readline.questionEMail("Enter your email: ");
debugger;
let x = Date.now();
let date = new Date(x);
let emp = {firstname:fn, lastname:ln,Gender:gender, email:em, time:date};
debugger;
records.push(emp);
fs.writeFileSync("records.json",JSON.stringify(records))
console.log("data store in file"); 