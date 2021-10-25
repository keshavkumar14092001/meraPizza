const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;

// Setting Template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Path
app.get('/', (req, res) => {
    res.render('home');
    res.end();
})


app.listen(PORT, () => {
    console.log(`The Server is listening at PORT ${PORT}`);
})