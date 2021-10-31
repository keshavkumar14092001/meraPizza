const axios = require('axios');
const Noty = require('noty');
const addToCart = document.querySelectorAll('.pizzaButton');
const cartCounter = document.querySelector('#totalPizza');

function updateCart(pizza) {
    // Cart Logic:
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item Successfully Added To Cart",
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something Went Wrong",
            progressBar: false
        }).show();
    });
}

addToCart.forEach((button) => {
    button.addEventListener('click', (e) => {
        let pizza = JSON.parse(button.dataset.pizza);
        updateCart(pizza);
    })
});