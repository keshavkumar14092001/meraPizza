const Offer = require('../../../models/offer');

function offerController() {
    return {
        async index(req, res) {
            const pizzaOffers = await Offer.find();
            return res.render('customers/offers', { pizzaOffers: pizzaOffers });
        }
    }
}

module.exports = offerController;