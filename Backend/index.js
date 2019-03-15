const express = require('express');
const db = require('sqlite');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');

const app = express();

app.use(function (request, result, next) {
  result.header('Access-Control-Allow-Origin', '*');
  result.header('Access-Control-Allow-Headers', 'Content-Type');
  result.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(bodyParser.json());

db.open('./db.db').then(database_ => {
  database = database_
})


// hämtar samtliga users från databasen (Alex)
app.get('/users', (request,response) => {
    database.all('SELECT * FROM users').then(books => {
        response.send(books);
    })
})

// lägger till users (Alex)
app.post('/users', (request,response) => {
  let newUser = request.body
  let newID = uuidv4();
  database.run('INSERT INTO users VALUES(?,?,?,?)', [newUser.name, newUser.password, newID, newUser.type]).then(books => {
      response.status(201).send(books);
  })
})



// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request, response) => {
    database.all('SELECT * FROM books').then(books => {
        response.send(books);
    })
})

// hämtar böcker utifrån ett sökord (Sara)
app.get('/books/:word', (request, response) => {
  database.all('select * from books where title like ? or title like ? OR author like ? or author like ? order by year desc',
  ['% '+ request.params.word +' %', request.params.word + ' %', request.params.word +', %', '% '+ request.params.word]
  ).then(books => {
    response.send(books)
  })
})

  app.listen(3000, function () {
    console.log('The server is running!');
});
