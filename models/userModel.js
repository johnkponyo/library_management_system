const db = require('../config/db');

const User = {
    getByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    create: (userData, callback) => {
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [userData.username, userData.password, userData.role], callback);
    }
};

module.exports = User;
