const db = require('../config/db');

const Book = {
    getAll: (callback) => {
        db.query('SELECT * FROM books', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    },
    create: (bookData, callback) => {
        db.query('INSERT INTO books (title, author, genre) VALUES (?, ?, ?)', [bookData.title, bookData.author, bookData.genre], callback);
    },
    update: (id, bookData, callback) => {
        db.query('UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?', [bookData.title, bookData.author, bookData.genre, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM books WHERE id = ?', [id], callback);
    }
};

module.exports = Book;
