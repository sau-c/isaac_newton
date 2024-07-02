require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport'); // Import passport
const connectDB = require('./server/config/db');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static(path.join(__dirname, 'public'))); // Asegurarse de que la ruta sea absoluta

// Configuración de sesión con connect-mongo
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60 // 1 día en segundos (opcional)
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 dia en milisegundos
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
app.use(expressLayout);
app.set('views', path.join(__dirname, 'views')); // Configurar directorio de vistas
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

// Routes
app.use('/', require('./server/routes/customer'))


// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
