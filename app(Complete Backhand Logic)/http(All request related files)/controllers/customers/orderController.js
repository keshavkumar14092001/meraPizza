const Order = require('../../../models/order');
const moment = require('moment');

function orderController() {
    return {
        orderStore(req, res) {
            const { clientPhoneNumber, clientAddress } = req.body;
            // Validating Request:
            if (!clientPhoneNumber || !clientAddress) {
                req.flash('error', 'All fields are required!!!')
                return res.redirect('/cart');
            }
            // Creating a Order Form:
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phoneNumber: clientPhoneNumber,
                address: clientAddress
            })
            // Saving Order to dataBase:
            order.save().then(result => {
                req.flash('success', 'Order placed successfully!!!');
                delete req.session.cart;
                return res.redirect('/customer/orders');
            }).catch(err => {
                res.flash('error', 'Something went wrong!!!');
                return res.redirect('/cart');
            })
        },
        async orderSummary(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } });
            res.header('Cache-Control', 'no-store');
            res.render('customers/orders', { orders: orders, moment: moment });
        }
    }
};

module.exports = orderController;