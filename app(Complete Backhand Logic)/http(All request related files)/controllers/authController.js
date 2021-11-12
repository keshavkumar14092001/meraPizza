const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    return {
        login(req, res) {
            return res.render('auth/login');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;

            // Validating Request:
            // First Validation: If any field is missing:
            if (!email || !password) {
                req.flash('error', 'All fields are required!!!');
                return res.render('auth/login');
            }
            // Second Validation done by the passport:
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.render('auth/login');
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }
                    if (user.role === 'admin') {
                        return res.redirect('/admin/orders');
                    }
                    else {
                        return res.redirect('/customer/orders');
                    }
                })
            })(req, res, next)
        },
        register(req, res) {
            return res.render('auth/register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;

            // Validating Request:

            // First Validation: If any field is missing:
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required!!!');
                req.flash('name', name);
                req.flash('email', email);
                return res.render('auth/register');
            }

            // Checking if email already exists or not:
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email is already registered!!!');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.render('auth/register');
                }
            })

            // Hashing Password:
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creating a user:
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            // Saving the user:
            user.save().then((user) => {
                return res.render('auth/login');
            }).catch((err) => {
                req.flash('error', 'Something went wrong!!!');
                return res.render('auth/register');
            });
        },
        logout(req, res) {
            req.logout();
            return res.redirect('/login');
        }
    }
}

module.exports = authController;