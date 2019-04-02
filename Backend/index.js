const express = require('express');
const db = require('sqlite');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const split = require('express-split')
const app = express();
const moment = require('moment')

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
app.get('/users', (request, response) => {
  database.all('SELECT * FROM users').then(users => {
    response.send(users);
  })
})

// lägger till users (Alex)
app.post('/users', (request, response) => {
  let newUser = request.body
  let newID = uuidv4();
  database.run('INSERT INTO users VALUES(?,?,?,?,?,?,?)', [newUser.name, newUser.password, newID, newUser.type, newUser.email, newUser.realname, newUser.address]).then(books => {
    response.status(201).send(books);
  })
})

// Tar bort users
app.delete('/users', (request, response) => {
  let incoming = request.body.Cookie
  database.all('SELECT * FROM tokens WHERE token =?', [incoming]).then(row => {
    if (row[0]) {
      database.run('DELETE FROM users WHERE name =?', [row[0].user])
      response.status(200).send('User deleted')
    } else
      response.status(404).send('User not found')
  })
})
// loggar in, skapar en cookie samt kollar om användaren är vanlig user eller admin (Alex)
app.post('/login', (request, response) => {
  let regUser = request.body
  database.all('SELECT * FROM users WHERE name=? AND password=?', [regUser.name, regUser.password]).then(row => {
    if (row[0]) {
      if (row[0].type === 'admin') {
        database.all('INSERT INTO tokens VALUES(?,?,?)', [regUser.name, regUser.ID, row[0].type]).then(user => {
          response.set('Cookie', regUser.ID)
          response.status(205).send(user)
        })
      } else
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

// Låter admins ta bort users (Alex)
app.delete('/admin', (request, response) => {
  let user = request.body.userName
  database.all('SELECT * FROM users WHERE id=? AND type=?', [user, 'user']).then(row => {
    if (row[0]) {
      database.run('DELETE FROM users WHERE id =?', [user]).then(() => {
        response.status(200).send('user deleted!');
      })
    } else {
      response.status(404).send('No such user');
    }
  })
})

// Låter admin promota en user till admin (Alex)
app.put('/admin', (req, res) => {
  let user = req.body
  database.all('SELECT * FROM users WHERE id=?', [user.id]).then(row => {
    if (row[0]) {
      database.run('UPDATE users SET type=? WHERE id=?', [user.type, user.id]).then(rows => {
        res.send(rows)
      })
    }
  })
})

// Hämtar utlånade böcker samt users som lånar dem (Alex)
app.post('/getloans', (request, response) => {
  let loans = request.body
  database.all('SELECT name FROM users WHERE id=?', [loans.user]).then(row => {
    database.all('SELECT title FROM books WHERE id=?', [loans.book]).then(rows => {
      if (row[0] && rows[0]) {
        let merge = {}
        merge.name = row[0].name
        merge.title = rows[0].title
        response.send(merge)
      }
    })
  })
})

// Tar emot meddelanden från kontaktsidan && visar dem på /inbox && låter admin hantera och ta bort dem (Alex)
app.post('/inbox', (request, response) => {
  let inbox = request.body
  database.run('INSERT INTO inbox VALUES(?,?,?,?,?,?)', [inbox.name, inbox.email, inbox.subject, inbox.content, inbox.date, inbox.id]).then(row => {
    response.status(201).send(row)
  })
})

app.get('/inbox', (req, res) => {
  database.all('SELECT * FROM inbox').then(msg => {
    res.send(msg)
  })
})


// sortering av böcker (Elin)
app.get('/books/sort/:sortBook', (request, response) => {
  console.log(request.params.sortBook)
  let book = request.params.sortBook
  database.all('SELECT * FROM books ORDER BY ' + book).then(books => {
    response.send(books);
    console.log(books);
  })
})

app.delete('/inbox', (req, res) => {
  database.run('DELETE FROM inbox WHERE id=?', [req.body.id]).then(() => {
    res.send('msg removed')
  })
})



// hämtar samtliga böcker från databasen (Alex)
app.get('/books', (request, response) => {

  //kollar först om kategori och/eller språk är valt (Sara)
  if (request.query.cat && request.query.lang) {
    database.all('select * from books where category = ? AND language = ?', [request.query.cat, request.query.lang]).then(books => {
      response.status(201)
      response.send(books)
    })
  } else if (request.query.cat) {
    database.all('select * from books where category = ?', [request.query.cat]).then(books => {
      response.status(201)
      response.send(books)
    })
  } else if (request.query.lang) {
    database.all('select * from books where language = ?', [request.query.lang]).then(books => {
      response.status(201)
      response.send(books)
    })
  } else {
    database.all('SELECT * FROM books').then(books => {
      response.send(books);
    })
  }
})

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

  if (request.query.cat && request.query.lang) {
    database.all('select * from books where category = ? AND language = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.cat, request.query.lang, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then(books => {
      response.status(201)
      response.send(books)
    })
  } else if (request.query.cat) {
    database.all('select * from books where category = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.cat, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then(books => {
      response.status(201)
      response.send(books)
    })
  } else if (request.query.lang) {
    database.all('select * from books where language = ? AND (title like ? OR author like ? OR (author like ? AND author like ?)) order by year desc', [request.query.lang, '%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']).then(books => {
      response.status(201)
      response.send(books)
    })
  } else {
    database.all('select * from books where title like ? OR author like ? OR (author like ? AND author like ?) order by year desc',
      ['%' + request.params.word + '%', '%' + request.params.word + '%', '%' + searched[0] + '%', '%' + searched[1] + '%']
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

//Ändra tillagd bok (Annika)
app.put('/books', (request, response) => {
  let title = request.body.title
  let author = request.body.author
  let category = request.body.category
  let year = request.body.year
  let language = request.body.language
  let id = request.body.id
  database.run('UPDATE books SET title=?, author=?, category=?, year=?, language=? WHERE id=?',
    [title, author, category, year, language, id]).then(books => {
    response.send(books)
  })
})

//Tar bort lån från loans-tabellen dagen efter utgångsdatumet (Yasmine & Sara)
let clearLoans = function() {
  let removeDate = moment().subtract(1, 'days').format('YYYY/MM/DD')
  database.run('DELETE FROM loans WHERE returnDate = ?', [removeDate])
}

setInterval(clearLoans, 6000 * 60 * 60 * 24)

//lägger in data i loans-tabellen (Yasmine & Sara)
app.post('/loans', (request, response) => {
  database.run('Insert into loans values (?, ?, ?, ?)', [request.body.returnDate, request.body.loanDate, request.body.userId, request.body.bookId]).then(loan => {
    response.status(201).send(loan);
  })
})

//hämtar vilka lån en viss användare har (Yasmine & Sara)
app.get('/loans/:name', (request, response) => {
  database.all('SELECT Books.title, Books.author, Loans.loanDate, Loans.returnDate, Loans.userId, Loans.bookId FROM Books INNER JOIN Loans ON Books.id=Loans.BookId INNER JOIN Users ON Users.id=Loans.userId WHERE Loans.userId=? order by Loans.returnDate asc', [request.params.name])
    .then(loan => {
      response.status(201).send(loan);
    })
})

//förlänger lån av en viss bok (Sara)
app.put('/loans/extend', (request, response) => {
  database.run('Update loans SET returnDate = ?, loanDate = ? WHERE bookId = ? AND userId = ?', [request.body.returnDate, request.body.loanDate, request.body.bookId, request.body.userId]).then(loan => {
    response.status(201).send(loan);
  })
})

// JOBBAR PÅ HÄR OCH TESTAR, BRY ER INTE!
// hämtar en användarens uppgifter (Maija)
app.get('/users/name', (request, response) => {
  database.all('SELECT * FROM users WHERE name = ?', ['NewTest']).then(user => {
    response.send(user)
  })
})

// // hämtar info från adressen
// app.get('/users/:name', (request, response) => {
//   response.send('Hej ' + request.params.name + '!')
// })


// uppdaterar en användarens uppgifter (Maija)
app.put('/users/', (request, response) => {
  database.run('UPDATE users SET name=?, password=?, email=?, realname=?, address=? WHERE name=?;', [request.body.name2, request.body.password, request.body.email, request.body.realname, request.body.address, request.body.name]).then(() => {

    database.all('SELECT * FROM users WHERE name=?;', [request.body.name2]).then((user) => {
      response.send(user);
      console.log(user)
    })
  })
})

// uppdaterar en användarens uppgifter (Maija)
app.put('/users/:name', (request, response) => {
  database.run('UPDATE users SET email=? WHERE name=?;', [name, password, email, realname, address]).then((user) => {
    response.send(user)
  })
})



app.listen(3000, function() {
  console.log('The server is running!')
});
