const express = require('express');
const app = express();
const morgan = require('morgan');
const exphos = require('express-handlebars');
const path = require('path')

//const app = require('express');

//Settings

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphos({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine','hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index'));


// Static Files
app.use(express.static(path.join(__dirname,'./public')));


module.exports = app;