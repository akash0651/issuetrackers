const express = require('express');
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
const port = 8003;

// Import database configuration
const db = require('./config/mongoose');
const session = require('express-session');

// Import Passport for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// Import the MongoStore for session storage
const MongoStore = require('connect-mongo');

// Create an Express application
const app = express();
app.use(express.static('assets'));

// Middleware for parsing request data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware for handling EJS layouts
app.use(expressLayouts);

// Configure the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session management
app.use(session({
    name: 'quoro',
    secret: 'hellochetan',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://kumarakashsahu98765:KrhlXh2AGON99ZPI@cluster0.dzyqlwv.mongodb.net/issuetrackerdb',
        autoRemove: 'disabled'
    })
}))

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the request
app.use(passport.setAuthenticatedUser);

// Routes
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})
