module.exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports.isLibrarian = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'librarian') {
        return next();
    }
    return res.redirect('/');
};

module.exports.isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'user') {
        return next();
    }
    return res.redirect('/');
};