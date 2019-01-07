// include from library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


// express app running
const app = express();

// setting ejs templating engine
app.set('view engine','ejs');
app.set('views','views');

// static folder to serve css images and js content
app.use(express.static(path.join(__dirname, 'public')));

// Importing Routers

app.get('/',(req, res, next) =>{
    res.render('non-registered-users/index',{
        title:'Index page',
    });
})

app.listen(3000);