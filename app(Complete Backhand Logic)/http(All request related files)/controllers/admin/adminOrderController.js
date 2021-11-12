const Order = require('../../../models/order');

function adminOrderController() {
    return {
        orderSummary(req, res) {
            Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, results) => {

                if (req.xhr) {
                    return res.json(results);
                }

                return res.render('admin/orders');
            })
        }
    }
}

module.exports = adminOrderController;