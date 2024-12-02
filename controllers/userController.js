const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {
    login: (req, res) => {
        res.render('users/login', {
            title: 'Login', 
            user: req.session.user || null, 
            error: req.session.error || null
        });
    },

    //librarian
    ldashboard: (req, res) => {
        res.render('users/ldashboard', {
            title: 'Dashboard',
            user: req.session.user || null
        });
    },

    //user
    udashboard: (req, res) => {
        res.render('users/udashboard', {
            title: 'Dashboard',
            user: req.session.user || null
        });
    },

    authenticate: (req, res) => {
        const { username, password } = req.body;
        User.getByUsername(username, (err, users) => {
            if (err) throw err;
            if (users.length > 0) {
                if(bcrypt.compareSync(password, users[0].password)){
                    req.session.user = users[0];
                        console.log(req.session.user)
                        if(req.session.user.role === 'librarian'){
                            res.redirect('/ldashboard')
                        }else if(req.session.user.role === 'user') {
                            res.redirect('/udashboard')
                        }else {
                            res.redirect('/login');
                        }
                } else {
                    req.session.error = 'Invalid username or password'
                    res.redirect('/login');
                }
            } else {
                req.session.error = 'Invalid username or password'
                res.redirect('/login');
            }
        });
    },

    register: (req, res) => {
        res.render('users/register', {
            title: 'Register',
            user: req.session.user || null, 
            error: req.session.error || null
        });
    },

    createUser: (req, res) => {
        const { username, password } = req.body;
        User.getByUsername(username, (err, users) => {
            if (err) throw err;
            if (users.length > 0) {
                res.render('users/login', { error: 'Username already is taken!', title: 'Login' });
            } else {
                const role = 'user'
                const hashedPassword = bcrypt.hashSync(password, 10);
                User.create({ username, password: hashedPassword, role }, (err) => {
                    if (err) throw err;
                    console.log('User registered!')
                    res.redirect('/login');
                });
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect('/');
        });
    }

};

module.exports = userController;
