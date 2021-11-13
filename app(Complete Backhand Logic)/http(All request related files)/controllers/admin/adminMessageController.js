const Message = require('../../../models/contact');
const moment = require('moment');

function adminMessageController() {
    return {
        async messageSummary(req, res) {
            const messages = await Message.find().sort({ 'createdAt': -1 });
            res.render('admin/message', { messages: messages, moment: moment });
        }
    }
}

module.exports = adminMessageController;