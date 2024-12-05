const Book = require('../models/bookModel');
const { HumanFriendlyDate } = require('human-friendly-date');

const bookController = {
    list: (req, res) => {
        Book.getAll((err, books) => {
            if (err) throw err;
            res.render('books/list', { books, title: 'Browse Books', user: req.session.user || null});
        });
    },

    add: (req, res) => {
        res.render('books/add', {title: 'Add Book', user: req.session.user || null });
    },

    create: (req, res) => {
        const { title, author, genre, description, available } = req.body;
        const cover = req.file ? `/uploads/book-covers/${req.file.filename}` : null; // relative file path

        Book.create({ title, author, genre, description, available, cover }, (err) => {
            if (err) throw err;
            req.session.alertMsg = 'Book added successfully!'
            res.redirect('/manage');
        });
    },

    manage: (req, res) => {
        Book.getAll((err, books) => {
            if (err) throw err;
            res.render('books/manage', { books, title: 'Manage Books', user: req.session.user || null, msg: req.session.alertMsg || null});
        });
    },

    edit: (req, res) => {
        const bookId = req.params.id;
        Book.getById(bookId, (err, book) => {
            if (err) throw err;
            res.render('books/edit', { book: book[0], title: 'Edit Book', user: req.session.user || null});
        });
    },

    update: (req, res) => {
        const bookId = req.params.id;
        const { title, author, genre, description, available } = req.body;
        const cover = req.file ? `/uploads/book-covers/${req.file.filename}` : null; // relative file path
        Book.update(bookId, { title, author, genre, description, available, cover }, (err) => {
            if (err) throw err;
            res.redirect('/manage');
        });
    },

    delete: (req, res) => {
        const bookId = req.params.id;
        Book.delete(bookId, (err) => {
            if (err) throw err;
            res.redirect('/manage');
        });
    },

    borrow: (req, res) => {
        const bookID = req.params.id;
        const userID = req.params.uid
        const borrowDate = HumanFriendlyDate(Date.now()).formattedDate
        const returnDate = HumanFriendlyDate(Date.now() + (7 * 24 * 60 * 60 * 1000)).formattedDate;

        Book.setBorrow({bookID, userID, borrowDate, returnDate}, (err) => {
            Book.updateStatus({bookID, val: 0}, (err) => {
                if (err) throw err;
            })
            if (err) throw err;
            res.redirect('/');
        });
        
    },

    returned: (req, res) => {
        const id = req.params.id
        const bid = req.params.bid
        Book.returned(bid, (err) => {
            if (err){ 
                throw err
            } 
            else {
                Book.updateTxnReturnStatus(id, (err) => {
                    if (err) throw err
                    res.redirect('/ldashboard');
                })
            }
        })
    }

};

module.exports = bookController;
