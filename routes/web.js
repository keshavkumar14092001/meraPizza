const homeController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/homeController');
const cartController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/cartController');
const authController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/authController');
const menuController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/menuController');
const offerController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/offerController');
const guestController = require('../app(Complete Backhand Logic)/http(All request related files)/middlewares/guest');
const messageController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/messageController');

function initRoutes(app) {

    app.get('/', homeController().index);

    app.get('/cart', cartController().index);

    app.post('/update-cart', cartController().update);

    app.get('/menu', menuController().index);

    app.get('/register', guestController, authController().register);

    app.post('/register', authController().postRegister);

    app.get('/login', guestController, authController().login);

    app.post('/login', authController().postLogin);

    app.get('/offers', offerController().index);

    app.post('/logout', authController().logout);

    app.get('/contact', messageController().contact);

    app.post('/contact', messageController().postContact);

}

module.exports = initRoutes;