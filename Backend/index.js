const express = require('express');
const db = require('sqlite');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const split = require('express-split')
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

//Deklarerar en databas variabel samt ansluter till databasen (Alex)
var database;
db.open('./db.db').then(database_ => {
  database = database_
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
  database.run('INSERT INTO users VALUES(?,?,?,?,?,?,?)', [newUser.name, newUser.password, newID, newUser.type, newUser.email, newUser.userName, newUser.adress]).then(books => {
    response.status(201).send(books);
  })
})

app.post('/login', (request, response) => {
  let regUser = request.body
   database.all('SELECT * FROM users WHERE name=? AND password=?', [regUser.name, regUser.password]).then(row => {
     if(row[0]) {
      database.all('INSERT INTO tokens VALUES(?,?,?)', [regUser.name, regUser.ID, row[0].type]).then(user => {
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

// Loggar ut (Alex)
app.post('/logout', (request, response) => {
   let token = request.body.Cookie
   database.run('DELETE FROM tokens WHERE token =?', [token]).then(() => {
     response.send('Utloggad');
   })
})


// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request, response) => {

  //kollar först om kategori och/eller språk är valt (Sara)
  if (request.query.cat && request.query.lang){
    database.all('select * from books where category = ? AND language = ?', [request.query.cat, request.query.lang]).then (books => {
      response.status(201)
      response.send (books)
    })
  }
  else if (request.query.cat){
    database.all('select * from books where category = ?', [request.query.cat]).then (books => {
      response.status(201)
      response.send (books)
    })
  }
  else if (request.query.lang){
    database.all('select * from books where language = ?', [request.query.lang]).then (books => {
      response.status(201)
      response.send (books)
    })
  }

  else {
    database.all('SELECT * FROM books').then(books => {
      response.send(books);
    })
  }
  })


      // // sotering av böcker - ej klar, låt stå (Elin)
      // app.get('/books', (request, response) => {
      //   database.all('SELECT * FROM books ORDER BY title').then(books => {
      //       response.send(books);
      //     })
      //   })

      //hämtar kategorier och språk (Sara)
      app.get('/books/catsandlangs', (request, response) => {
        database.all('select distinct category from books order by category').then(books => {
          let categories = books.map(row => row.category)
            database.all('select distinct language from books order by language').then(books => {
              let languages = books.map(row => row.language)
              let all = [categories, languages]
              response.send(all)
            })
        })
      })

      // hämtar böcker utifrån sökord (Sara)
      app.get('/books/:word', (request, response) => {
        let searched = request.params.word.split(' ')
        //funkar inte att söka på tom sträng

        if (request.query.cat && request.query.lang){
            database.all('select * from books where category = ? AND language = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.cat, request.query.lang, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then (books => {
              response.status(201)
              response.send (books)
            })
        }
        else if (request.query.cat){
          database.all('select * from books where category = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.cat, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then (books => {
            response.status(201)
            response.send (books)
          })
        }
        else if (request.query.lang){
          database.all('select * from books where language = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.lang, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then (books => {
            response.status(201)
            response.send (books)
          })
        }
        else {
          database.all('select * from books where title like ? OR author like ? OR (author like ? AND author like ?) order by year desc',
          ['%' + request.params.word + '%', '%' + request.params.word + '%','%' + searched[0] + '%', '%' + searched[1] + '%']
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
        database.run('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, author, category, year, language, image, id]).then(books => {
        response.send(books)
        })
      })


app.listen(3000, function() {
  console.log('The server is running!')
});
