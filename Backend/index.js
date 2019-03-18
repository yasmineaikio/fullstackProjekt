const express = require('express');
const db = require('sqlite');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const app = express();



app.use(function(request, result, next) {
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

var inloggade = []

// hämtar samtliga users från databasen (Alex)
app.get('/users', (request, response) => {
  database.all('SELECT * FROM users').then(books => {
    response.send(books);
  })
})

// lägger till users (Alex)
app.post('/users', (request, response) => {
  let newUser = request.body
  let newID = uuidv4();
  database.run('INSERT INTO users VALUES(?,?,?,?,?)', [newUser.name, newUser.password, newID, newUser.type, newUser.email]).then(books => {
    response.status(201).send(books);
  })
})

//login validator (Alex)
app.post('/login', (request, response) => {
  let regUser = request.body

  database.all('SELECT * FROM users WHERE name =? AND password =?', [regUser.name, regUser.password]).then(books => {
    response.status(201).send(books);
    if (regUser) {
      inloggade.push(regUser)
      console.log(inloggade);
    }
  })
})

app.get('/login', (request, response) => {
    function checker() {
      for (let i = 0; i < inloggade.length; i++) {
        var user = inloggade[i]
        database.all('SELECT * FROM users WHERE name =? AND password =?', [user.name, user.password]).then(inloggade => {
          response.status(201).send(inloggade);
        })
      }
    }
    checker()
  })

// kör delete istället
      app.get("/logout", function(req, res) {
        req.logout();

        console.log("logged out")

        return res.send();
      });


      // hämtar samtliga böcker från databasen (Alex)
      app.get('/books', (request, response) => {
        database.all('SELECT * FROM books').then(books => {
          response.send(books);
        })
      })

      // hämtar böcker utifrån ett sökord (Sara)
      app.get('/books/:word', (request, response) => {
        database.all('select * from books where title like ? or title like ? or title like ? OR author like ? or author like ? order by year desc',
          ['% ' + request.params.word + ' %', request.params.word + ' %', '% ' + request.params.word, request.params.word + ', %', '% ' + request.params.word]
        ).then(books => {
          response.status(201)
          response.send(books)
        })
      })

      app.listen(3000, function() {
        console.log('The server is running!');
      });
