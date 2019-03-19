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

var database;
db.open('./db.db').then(database_ => {
  database = database_
  // database.all('SELECT * FROM users').then(users => {
  //    allUsers = users
  //   console.log(allUsers);
  // })
})

// hämtar samtliga users från databasen (Alex)
app.get('/users', (request,response) => {
    database.all('SELECT * FROM users').then(users => {
      response.send(users);
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

// logga in (Alex)
app.post('/login', (request, response) => {
  let newID = uuidv4();
  let regUser = request.body
   database.all('SELECT * FROM users WHERE name=? AND password=?', [regUser.name, regUser.password]).then(row => {
     if(row[0]) {
      database.all('INSERT INTO tokens VALUES(?,?)', [regUser.name, newID]).then(user => {
        response.status(201).send(user);
      })
     } else {
      response.status(404).send('')
      console.log('Fel användernamn eller lösenord, försök igen!');
     }
   })
  })


 // Hämtar inloggade (Alex)
app.get('/login', (request, response) => {
    database.all('SELECT user FROM tokens').then(inloggade => {
     response.status(201).send(inloggade);
  })
})

// Logga ut (Alex) NEXT

      // hämtar samtliga böcker från databasen (Alex)
      app.get('/books', (request, response) => {
        database.all('SELECT * FROM books').then(books => {
          response.send(books);
        })
      })

      // hämtar böcker utifrån sökord (Sara)
      app.get('/books/:word', (request, response) => {
        if (request.query.cat && request.query.lang){
            database.all('select * from books where title like ? OR author like ? AND category = ? AND language = ? order by year desc', ['%' + request.params.word + '%', '%' + request.params.word + '%', request.query.cat, request.query.lang]).then (books => {
              response.status(201)
              response.send (books)
            })
        }
        else if (request.query.cat){
          database.all('select * from books where title like ? OR author like ? AND category = ? order by year desc', ['%' + request.params.word + '%', '%' + request.params.word + '%', request.query.cat]).then (books => {
            response.status(201)
            response.send (books)
          })
        }
        else if (request.query.lang){
          database.all('select * from books where title like ? OR author like ? AND language = ? order by year desc', ['%' + request.params.word + '%', '%' + request.params.word + '%', request.query.lang]).then (books => {
            response.status(201)
            response.send (books)
          })
        }
        else {
          database.all('select * from books where title like ? OR author like ? order by year desc',
          ['%' + request.params.word + '%', '%' + request.params.word + '%']
          ).then(books => {
            response.status(201)
            response.send(books)
          })
        }
      })

      // hämtar lånade böcker (loans) från databasen (Maija)
      app.get('/loans', (request, response) => {
        database.all('SELECT * FROM loans').then(books => {
          response.send(books);
        })
      })


      app.listen(3000, function() {
        console.log('The server is running!')
      })
