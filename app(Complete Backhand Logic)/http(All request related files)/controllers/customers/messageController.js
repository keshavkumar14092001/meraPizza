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
                return res.render('auth/register');
            }
            // Creating a message:
            const user = new Message({
                name: name,
                email: email,
                message: message
            })
            // Saving the user's message to the dataBase:
            user.save().then((user) => {
                return res.render('customers/contact');
                new Noty({
                    type: 'success',
                    timeout: 1000,
                    text: "Item Successfully Added To Cart",
                    progressBar: false
                }).show();
            }).catch((err) => {
                req.flash('error', 'Something went wrong!!!');
                return res.render('customers/contact');
            });
        }
    }
}

module.exports = messageController;