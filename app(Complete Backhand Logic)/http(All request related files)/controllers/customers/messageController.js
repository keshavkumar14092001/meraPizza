const Message = require('../../../models/contact');
const Noty = require('noty');

function messageController() {
    return {
        contact(req, res) {
            return res.render('customers/contact');
        },
        postContact(req, res) {
            const { name, email, message } = req.body;
            // Validating Reguest:
            if (!name || !email || !message) {
                req.flash('error', 'All fields are required!!!');
                return res.redirect('/contact');
            }
            // Creating a message:
            const user = new Message({
                name: name,
                email: email,
                message: message
            })
            // Saving the user's message to the dataBase:
            user.save().then((user) => {
                req.flash('success', 'Message sent successfully!!!');
                return res.redirect('/');
            }).catch((err) => {
                req.flash('error', 'Something went wrong!!!');
                return res.redirect('/contact');
            });
        }
    }
}

module.exports = messageController;