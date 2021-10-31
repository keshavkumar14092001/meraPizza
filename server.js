require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://Kumar123:140920@cluster0.mrixd.mongodb.net/pizzaMenu?retryWrites=true&w=majority';
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

// Connecting to the DataBase:
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('***DB Connected***');
});

// Session Config:
app.use(session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: DB_URL
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 Hours
}));

// Express Flash Config:
app.use(flash());

// Declaring Public/STatic Folder:
app.use(express.static('public'));

// Enabling express reading json ability:
app.use(express.json());

// Global Middleware:
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
});

// Setting Template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Routes:
require('./routes/web')(app);

// Listening to PORT:
app.listen(PORT, () => {
    console.log(`The Server is listening at PORT ${PORT}`);
});