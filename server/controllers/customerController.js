const Customer = require("../models/Customer");
const mongoose = require("mongoose");

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

exports.homepage = (req, res) => {
  res.render('register', { title: 'Register', messages: req.flash('error') });
};

exports.registerPost = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await req.flash('error', 'Usuario ya existe');
      return res.redirect('/');
    }

    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    await req.flash('error', 'Error registrando usuario');
    res.redirect('/');
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};



/**
 * GET /
 * Homepage
 */
exports.customers = async (req, res) => {

  // Remove
  // const messages = await req.consumeFlash('info');
  // Use this instead
  const messages = await req.flash("info");
  const locals = {
    title: "Secundaria Isaac Newton",
    description: "Sistema de manejo de estudiantes",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "Sobre nosotros",
    description: "Nuestra mision es formar futuros lideres",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Agregar estudiante",
    description: "Agregar estudiante",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "Agregado exitosamente.");
    res.redirect("/customers");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Customer Data
 */
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Estudiantes",
      description: "Estudiantes registrados",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Editar estudiante",
      description: "Editar estudiante",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await req.flash("info", "Actualizado exitosamente.");
    await res.redirect("/customers");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    await req.flash("info", "Eliminado exitosamente.");
    res.redirect("/customers");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Buscar estudiantes",
    description: "Buscar estudiantes",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
