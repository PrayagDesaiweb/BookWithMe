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

// middlware for parsing body
app.use(bodyParser.urlencoded({ extended: false }));

// Importing Routers
const nonRegisteredUsersRouter = require('./routers/non_registered_users');
const adminRouter = require('./routers/admin');
const registeredHostsRouter = require('./routers/registered-hosts')

// importing database related logic
const mongoConnect = require('./util/database');



// handling router as per as incoming requests
app.use(nonRegisteredUsersRouter);
app.use(adminRouter);
app.use(registeredHostsRouter);

// start server on connecting the database server
mongoConnect.mongoconnect( () => {
    app.listen(3000);
})