const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login:
        // Checking if email is present in the database or not:
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Email is not registered!!!' });
        }
        // Checking for Passowrd:
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Loged in successfully!!!' });
            }
            return done(null, false, { message: 'Please enter the correct password' });
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' });
        });
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = init;