require('dotenv').config();
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts');

const userRoutes = require('./routes/bookRoutes')
const bookRoutes = require('./routes/userRoutes')

//const db = require('./config/db')
const app = express();

// Middleware
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true 
}));

// Use EJS and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
// Set default layout
app.set('layout', 'layouts/main');

// Routes
app.use('/', userRoutes);
app.use('/', bookRoutes);

//404
app.use((req, res) => {
    //const sessionData = req.session
    res.status(404).render('404', {title: '404'})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
