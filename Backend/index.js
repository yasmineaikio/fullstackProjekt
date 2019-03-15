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

var inloggade =[] 

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
  database.run('INSERT INTO users VALUES(?,?,?,?,?)', 
  [newUser.name, newUser.password, newID, newUser.type, newUser.email]).then(books => {
      response.status(201).send(books);
  })
})

//login validator (Alex)
app.post('/login', (request, response) => {
  let regUser = request.body
  database.all('SELECT * FROM users WHERE name =? AND password =?', [regUser.name, regUser.password]).then(books => {
    response.status(201).send(books);
    if(regUser) {
      inloggade.push(regUser)
      console.log(inloggade);
    }
  })
})

app.get('/login', (request, response) => {
  async function checker() {
     for (let i = 0; i < inloggade.length; i++) {
      var user = inloggade[i]
      database.all('SELECT * FROM users WHERE name =? AND password =?', [user.name, user.password]).then(inloggade => {
      response.status(201).send(inloggade);
    })
  }
 }
  checker()
})

// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request,response) => {
    database.all('SELECT * FROM books').then(books => {
        response.send(books);
    })
})


// hämtar böcker utifrån ett sökord (Sara)
app.get('/books/:word', (request, response) => {
  console.log('Hej');
  response.send('Hej ' + request.params.word)
  // database.all('SELECT * FROM books').then(books => {
  //     response.send(books);
  // })

  // let book = books.find(value => value.title === request.params.word);
  //
  // if (book) {
  //   response.send(book);
  // } else {
  //   response.status(404)
  //   response.send('Ingen matchning');
  // }
  // database.all('select * from books WHERE ').then(books => {
  //   response.send(books);
  // })
})

  app.listen(3000, function () {
    console.log('The server is running!');
});
