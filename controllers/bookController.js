const Book = require('../models/bookModel');

const bookController = {
    list: (req, res) => {
        Book.getAll((err, books) => {
            if (err) throw err;
            res.render('books/list', { books, title: 'Browse Books' });
        });
    },
    add: (req, res) => {
        res.render('books/add', { books, title: 'Add Book' });
    },
    create: (req, res) => {
        const { title, author, genre } = req.body;
        Book.create({ title, author, genre }, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    },
    edit: (req, res) => {
        const bookId = req.params.id;
        Book.getById(bookId, (err, book) => {
            if (err) throw err;
            res.render('books/edit', { book: book[0], title: 'Add Book' });
        });
    },
    update: (req, res) => {
        const bookId = req.params.id;
        const { title, author, genre } = req.body;
        Book.update(bookId, { title, author, genre }, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    },
    delete: (req, res) => {
        const bookId = req.params.id;
        Book.delete(bookId, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    }
};

module.exports = bookController;
