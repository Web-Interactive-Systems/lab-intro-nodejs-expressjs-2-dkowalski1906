const express = require("express");
const app = express();

const todos = require("../data/todos.json");

// Todo import `todos` from `../data/todos.json`
// todos will be used as an array of data

app.get("/ping", (req, res) => {
  res.json("pong");
});

// Todo: Implement an endpoint that handles two query parameters: 'limit' and 'search'
// Here are some examples:
//  /api/todos/?limit=30
//  /api/todos/?search='totam'
//  /api/todos/?limit=30&search='totam'
// The endpoint should filter and return todos based on 'limit' and 'search'
// limit: should limit the number of todos returned to the client to the value of limit
// search: should return only the todos that contains search text value in the title
app.get("/api/todos", (req, res) => {
  // console.log(typeof req.query.limit);
  // if (typeof req.query.limit != number) {
  //   res.json(null)
  // }

  const { limit, search } = req.query;
  let reponse = todos;

  //si search existe
  if (search) {
    reponse = reponse.filter((e) => {
      return e.title.includes(req.query.search);
    });
  }

  //si limit existe
  if (limit) {
    const limitInt = parseInt(limit)
    if (typeof limitInt === "number" && !isNaN(limitInt)) {
      reponse = reponse.slice(0, limitInt)
    }
  }

  res.json(reponse);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000....");
});
