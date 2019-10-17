// include from library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


// express app running
const app = express();



// setting ejs templating engine
app.set('view engine','ejs');
app.set('views','views');

// static folder to serve css images and js content
app.use(express.static(path.join(__dirname, 'public')));

// middlware for parsing body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret : 'prayagdesai'}));

// Importing Routers
const nonRegisteredUsersRouter = require('./routers/non_registered_users');
const adminRouter = require('./routers/admin');
const registeredHostsRouter = require('./routers/registered-hosts');
const registeredUsersRouter = require('./routers/registered-users');
const errorRouter = require('./routers/error');

// importing database related logic
const mongoConnect = require('./util/database');



// handling router as per as incoming requests
app.use(nonRegisteredUsersRouter);
app.use(adminRouter);
app.use(registeredHostsRouter);
app.use(registeredUsersRouter);
app.use(errorRouter);

// start server on connecting the database server
mongoConnect.mongoconnect( () => {
    app.listen(3000);
})