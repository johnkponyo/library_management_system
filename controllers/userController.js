const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const Book = require('../models/bookModel')

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
        let totalBorrowed = 0

        Book.getTotalBorrowedByUser(req.session.user.id, (err, book) => {
            if (err) throw err;
            totalBorrowed = book[0].total_borrowed
            
            res.render('users/udashboard', {
                title: 'Dashboard',
                user: req.session.user || null,
                totBorrowed: totalBorrowed
            });
        })
    },

    authenticate: (req, res) => {
        const { username, password } = req.body;
        User.getByUsername(username, (err, users) => {
            if (err) throw err;
            if (users.length > 0) {
                if(bcrypt.compareSync(password, users[0].password)){
                    req.session.user = users[0];
                        if(req.session.user.role === 'librarian'){
                            res.redirect('/ldashboard')
                        }else if(req.session.user.role === 'user') {
                            res.redirect('/')
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
