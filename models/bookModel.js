const db = require('../config/db');

const Book = {
    getAll: (callback) => {
        db.query('SELECT * FROM books', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    },

    create: (bookData, callback) => {
        db.query('INSERT INTO books (title, author, genre, description, available, cover) VALUES (?, ?, ?, ?, ?, ?)', [bookData.title, bookData.author, bookData.genre, bookData.description, bookData.available, bookData.cover], callback);
    },

    update: (id, bookData, callback) => {
        db.query('UPDATE books SET title = ?, author = ?, genre = ?, description = ?, available = ?, cover = ? WHERE id = ?', [bookData.title, bookData.author, bookData.genre, bookData.description, bookData.available, bookData.cover, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM books WHERE id = ?', [id], callback);
    }
};

module.exports = Book;
