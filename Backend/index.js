const express = require('express');
const db = require('sqlite');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const app = express();



app.use(function(request, result, next) {
  result.header('Access-Control-Allow-Origin', '*');
  result.header('Access-Control-Allow-Headers', 'Content-Type');
  result.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  result.header('Access-Control-Allow-Credentials', 'true');
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

// logga in (Alex) Ta ej bort!!!!
// app.post('/login', (request, response) => {
//   let newID = uuidv4();
//   let regUser = request.body
//    database.all('SELECT * FROM users WHERE name=? AND password=?', [regUser.name, regUser.password]).then(row => {
//      if(row[0]) {
//       database.all('INSERT INTO tokens VALUES(?,?)', [regUser.name, newID]).then(user => {
//         response.set('Cookie', newID)
//         response.status(201).send(user)
//       })

//      } else {
//       response.status(404).send('')
//       console.log('Fel användernamn eller lösenord, försök igen!');
//      }
//    })
//   })

app.post('/login', (request, response) => {
  let regUser = request.body
   database.all('SELECT * FROM users WHERE name=? AND password=?', [regUser.name, regUser.password]).then(row => {
     if(row[0]) {
      database.all('INSERT INTO tokens VALUES(?,?)', [regUser.name, regUser.ID]).then(user => {
        response.set('Cookie', regUser.ID)
        response.status(201).send(user)
      })
     } else {
      response.status(404).send('')
      console.log('Fel användernamn eller lösenord, försök igen!');
     }
   })
  })

 // Hämtar inloggade (Alex)
app.get('/login', (request, response) => {
    database.all('SELECT * FROM tokens').then(inloggade => {
     response.status(201).send(inloggade);
  })
})

// Logga ut (Alex)
app.post('/logout', (request, response) => {
   let token = request.body.Cookie
   database.run('DELETE FROM tokens WHERE token =?', [token]).then(() => {
     response.send('Utloggad');
   })
})

// Kollar om user är admin (Alex)
app.get('/admin', (request, response) => {
  database.all('SELECT * FROM users WHERE type=?', ['ADMIN']).then(row => {
    response.send(row)
  })
})

// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request, response) => {
  database.all('SELECT * FROM books').then(books => {
    response.send(books);
  })
})

// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request, response) => {
  database.all('SELECT * FROM books').then(books => {
      response.send(books);
    })

        //Saras - ta ej bort!
        // database.all('select category, language from books order by category, language').then(books => {
        //   let allCats = []
        //   let allLangs = []
        //   for (let i = 0; i < books.length; i++){
        //     allCats[i] = books[i].category
        //     allLangs[i] = books[i].language
        //   }
        //   let uniqueCats = [...new Set(allCats)]
        //   let uniqueLangs = [...new Set(allLangs)]
        //   response.send(uniqueCats && uniqueLangs)
        // })

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

      //Lägger till bok (Annika)
      app.post('/books', (request, response) => {
        let title = request.body.title
        let author = request.body.author
        let category = request.body.category
        let year = request.body.year
        let language = request.body.language
        let id = uuidv4()
        let image = request.body.image
        let amount = request.body.amount
        database.run('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [title, author, category, year, language, image, amount]).then(books => {
        response.send(books)
        }) 
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
