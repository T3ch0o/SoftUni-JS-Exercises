const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports.registerGet = function(req, res) {
    res.render('user/register');
};

module.exports.registerPost = function(req, res) {
    const user = req.body;

    if (user.inputPassword && user.inputPassword !== user.repeatedPassword) {
        return res.render('user/register', {error: 'Password do not match.'});
    }

    const salt = encryption.generateSalt();
    user.salt = salt;

    if (user.password) {
        const hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.passwordHash = hashedPassword;
    }

    User.create(user)
        .then(function(user) {
            req.logIn(user, function(error, user) {
                if (error) {
                    return res.render('user/register', {error: 'Authentication not working'});
                }

                res.redirect('/');
            });
        })
        .catch(function(error) {
            const index = error.message.lastIndexOf(':') + 2;
            const message = error.message.slice(index);
            res.render('user/register', { error: message });
        });
};

module.exports.loginGet = function(req, res) {
    res.render('user/login');
};

module.exports.loginPost = function(req, res) {
    const userToLogin = req.body;

    User.findOne({ email: userToLogin.email }).then(function(user) {
        if (!user || !user.authenticate(userToLogin.password)) {
            return res.render('user/login', { error: 'Invalid credentials!' });
        }

        req.logIn(user, function(error, user) {
            if (error) {
                return res.render('user/login', { error: 'Authentication not working' });
            }

            res.redirect('/');
        });
    });
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};