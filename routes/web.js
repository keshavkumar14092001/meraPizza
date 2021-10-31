const homeController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/homeController');
const cartController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/cartController');
const authController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/authController');
const menuController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/menuController');
const offerController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/offerController');

function initRoutes(app) {

    app.get('/', homeController().index);

    app.get('/cart', cartController().index);

    app.get('/menu', menuController().index);

    app.get('/register', authController().register);

    app.get('/login', authController().login);

    app.get('/offers', offerController().index);

    app.post('/update-cart', cartController().update);

}

module.exports = initRoutes;