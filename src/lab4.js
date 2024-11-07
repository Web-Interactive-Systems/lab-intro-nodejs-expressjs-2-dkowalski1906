const express = require("express");
const app = express();

/**
 Check the documentation of expressjs middleware  
 https://expressjs.com/en/guide/using-middleware.html#using-middleware

 If you look in the documentation, you will fine that is it possible to combine multiple middlewares

/*
  Todo: Write another expressjs middleware: logMidware   
  to log some information about req

  Combine the verifyMidware with logMidware for GET and POST
  - if there is no token throw an error
  */

function verifyMidware(req, res, next) {
  console.log('Time:', Date.now());
  if (req.query.token) {
    next();
  } else {
    next(new Error("Nope"));
  }
}

function logMidware(req, res, next) {
  console.log('Token:', req.query.token);
  next();
}

app.get('/path', [verifyMidware, logMidware], (req, res) => {
  res.send("Success !");
});

app.post('/path', [verifyMidware, logMidware], (req, res) => {
  res.send("Success !");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(`Error: ${err.message}`);
});


app.listen(4000, () => {
  console.log("Server is listening on port 3000....");
});
