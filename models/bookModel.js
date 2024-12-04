const db = require('../config/db');

const Book = {
    getAll: (callback) => {
        db.query('SELECT * FROM books ORDER BY created_at DESC', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    },

    create: (bookData, callback) => {
        db.query(
                `INSERT INTO books (title, author, genre, description, available, cover) 
                VALUES (?, ?, ?, ?, ?, ?)`, 
                [
                    bookData.title, 
                    bookData.author, 
                    bookData.genre, 
                    bookData.description, 
                    bookData.available, 
                    bookData.cover
                ], 
                callback
            );
    },

    update: (id, bookData, callback) => {
        db.query(
                `UPDATE books 
                SET 
                title = ?, 
                author = ?, 
                genre = ?, 
                description = ?, 
                available = ?, 
                cover = ? 
                WHERE id = ?`, 
                [
                    bookData.title, 
                    bookData.author, 
                    bookData.genre, 
                    bookData.description, 
                    bookData.available, 
                    bookData.cover, 
                    id
                ], 
                callback
            );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM books WHERE id = ?', [id], callback);
    },

    setBorrow: (data, callback) => {
        db.query(
                `INSERT into transactions (user_id, book_id, borrow_date, return_date) 
                VALUES (?, ?, ?, ?)`, 
                [
                    data.userID, 
                    data.bookID, 
                    data.borrowDate, 
                    data.returnDate
                ], 
                callback
            );
    },

    updateStatus: (data, callback) => {
        db.query(
                `UPDATE books 
                SET available = ? 
                WHERE id = ?`, 
                [
                    data.val, 
                    data.bookID
                ], 
                callback
            );
    },

    getTotalBorrowedByUser: (id, callback) => {
        db.query(`
                SELECT COUNT(*) AS total_borrowed 
                FROM transactions 
                WHERE user_id = ?`, 
                [id], 
                callback
            );
    },

    getUserTransactionHistory:(id, callback) => {
        db.query(
                `SELECT 
                books.title AS book_title,
                books.author AS book_author,
                books.genre AS book_genre, 
                books.cover AS book_cover,
                transactions.borrow_date,
                transactions.return_date
                FROM books 
                INNER JOIN transactions ON books.id = transactions.book_id 
                WHERE transactions.user_id = ?`, 
                [id], 
                callback
            )
    },

    getAllTransactionHistory:(callback) => {
        db.query(
                `SELECT 
                users.username,
                books.title AS book_title,
                books.author AS book_author,
                books.genre AS book_genre, 
                books.cover AS book_cover,
                books.available,
                transactions.borrow_date,
                transactions.return_date,
                transactions.status
                FROM books
                INNER JOIN transactions ON books.id = transactions.book_id
                INNER JOIN users ON users.id = transactions.user_id
                ORDER BY transactions.return_date DESC;
                `,  
                callback
            )
    },
};

module.exports = Book;
