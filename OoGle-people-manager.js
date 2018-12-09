// The API toolkit for making REST systems easily

const express = require('express');


// A good solution for handling JSON data in routes

const bodyParser = require('body-parser');


// Node JS modules for filesystem access

const fs = require('fs');


// Our database connection

// This will be a JSON object of our programmers

// and can be accessed as if it was any other javascript

// object


const database = require('./programmers.json');



// Make an instance of our express application

const app = express();


// Specify our > 1024 port to run on

const port = 3000;



// Apply our middleware so our code can natively handle JSON easily

app.use(bodyParser.json());



// We must have our list of programmers to use

if (!fs.existsSync('./programmers.json')) {

  throw new Error('Could not find database of programmers!');
}




// Build our routes



//Returns all slave programmers
app.get('/', (req, res) => {

  res.send(database);

});




//retuns all programmers with id
app.get('/:id', (req, res) => {

  const id = req.params.id;


  res.send(database[id]);

});




//updates programmer:id with new data in req.body?
app.put('/:id', (req, res) => {

  const id = req.params.id;

  const body = req.body;
//updates everything of id to new body
  database[id]=body;
  res.send(`updated body of ID: ${id}`);

});




app.post('/', (req, res) => {

  const body = req.body;  // Hold your JSON in here!
  

  //Check that data in body of request is valid JSON?

  database[req.body.id]= body;

  res.send(`You sent: ${body} to ID: $req.body.id}`);

});





// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE



app.get('/.', (req, res) =>{  //for any other route starting with get...
  res.send(`Incorrect get route entered`);
 });
app.put('/.', (req, res) =>{  //for any other route starting with put...
  res.send(`Incorrect put route entered`);
 });
app.post('/.', (req, res) =>{  //for any other route starting with post...
  res.send(`Incorrect post route entered`);
 });


app.listen(port, () => {

  console.log(`She's alive on port ${port}`);

});
