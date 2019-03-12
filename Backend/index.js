const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Test')
  })
  
  app.listen(3000)