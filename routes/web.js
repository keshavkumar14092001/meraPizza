const homeController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/homeController');
const cartController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/cartController');
const authController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/authController');
const menuController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/menuController');
const offerController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/offerController');
const guestMiddleware = require('../app(Complete Backhand Logic)/http(All request related files)/middlewares/guest');
const authMiddleware = require('../app(Complete Backhand Logic)/http(All request related files)/middlewares/auth');
const messageController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/messageController');
const orderController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/customers/orderController');
const adminOrderController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/admin/adminOrderController');
const adminMessageController = require('../app(Complete Backhand Logic)/http(All request related files)/controllers/admin/adminMessageController');
const adminCheck = require('../app(Complete Backhand Logic)/http(All request related files)/middlewares/admin');

function initRoutes(app) {

    app.get('/', homeController().index);

    app.get('/cart', cartController().index);

    app.post('/update-cart', cartController().update);

    app.get('/menu', menuController().index);

    app.get('/register', guestMiddleware, authController().register);

    app.post('/register', authController().postRegister);

    app.get('/login', guestMiddleware, authController().login);

    app.post('/login', authController().postLogin);

    app.get('/offers', offerController().index);

    app.post('/logout', authController().logout);

    app.get('/contact', authMiddleware, messageController().contact);

    app.post('/contact', messageController().postContact);

    // Customers Routes:

    app.post('/orders', authMiddleware, orderController().orderStore);

    app.get('/customer/orders', authMiddleware, orderController().orderSummary);

    // Admin Routes:

    app.get('/admin/orders', adminCheck, adminOrderController().orderSummary);

    app.get('/admin/messages', adminCheck, adminMessageController().messageSummary);

}

module.exports = initRoutes;