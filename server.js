const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;

// Declaring Public/STatic Folder:
app.use(express.static('public'));

// Path
app.get('/', (req, res) => {
    res.render('home');
    res.end();
})

// Setting Template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


app.listen(PORT, () => {
    console.log(`The Server is listening at PORT ${PORT}`);
})