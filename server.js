const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;

// Declaring Public/STatic Folder:
app.use(express.static('public'));

// Setting Template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Path
app.get('/', (req, res) => {
    res.render('home');
    res.end();
})

app.get('/cart', (req, res) => {
    res.render('customers/cart');
    res.end();
})

app.get('/menu', (req, res) => {
    res.render('menu');
    res.end();
})

app.get('/register', (req, res) => {
    res.render('auth/register');
    res.end();
})

app.get('/login', (req, res) => {
    res.render('auth/login');
    res.end();
})

// Listening to PORT:
app.listen(PORT, () => {
    console.log(`The Server is listening at PORT ${PORT}`);
})