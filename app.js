// include from library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


// express app running
const app = express();

// setting ejs templating engine
app.set('view engine','ejs');
app.set('views','views');

app.get('/',(req, res, next) =>{
    res.render('non-registered/index',{
        title:'Index page',
        imageUrl:"views\non-registered\images\downtown.jpg"
    });
})

app.listen(3000);