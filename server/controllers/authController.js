const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Usuario inexistente.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

exports.login = (req, res) => {
  res.render('login', { title: 'Login', messages: req.flash('error') });
};

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/customers',
  failureRedirect: '/login',
  failureFlash: true
});

exports.register = (req, res) => {
  res.render('register', { title: 'Register', messages: req.flash('error') });
};

exports.registerPost = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await req.flash('error', 'Usuario ya existe');
      return res.redirect('/register');
    }

    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    await req.flash('error', 'Error registrando usuario');
    res.redirect('/register');
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
