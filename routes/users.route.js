module.exports = (app) => {

    
    const users = require('../controllers/users.controller.js');
    const {loggedIn, adminOnly} = require("../middleware/auth.js");
   // const userController = require('../controllers/user.controller');


    // Create a new Note//REgister Users
    app.post('/register', users.Ziahluhna);

    app.post('/login',users.login);

   // app.post('/token',users.RefreshToken);

    app.get('/auth', loggedIn, users.authuseronly);

    // Admin user only
    app.get('/admin', loggedIn, adminOnly, users.adminonly);
    

    // Retrieve all Notes
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);
}