const axios = require('axios');
const Noty = require('noty');
const initAdmin = require('./admin');

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

// Removing Success Message:
const msg = document.querySelector('#success-message');
const errMsg = document.querySelector('#errMessage');

if (msg) {
    setTimeout(() => {
        msg.remove();
    }, 2000);
}

if (errMsg) {
    setTimeout(() => {
        errMsg.remove();
    }, 5000);
}

// Calling admin Function:
let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes('admin')) {
    initAdmin();
}


// Changing Order Status:
let statusText = document.querySelectorAll('.statusText');
let Order = document.querySelector('#hiddenInput');
let order = Order ? Order.value : null;
let i = 0;
let j;

order = JSON.parse(order);

function updateStatus(order) {
    for (i = 0; i < statusText.length; i++) {
        if (i === 0) {
            if (statusText[i].dataset.status === order.status) {
                statusText[i].innerHTML = '( Completed )';
                statusText[i].classList.add('completed');
                statusText[i + 1].innerHTML = '( inProgress )';
                statusText[i + 1].classList.add('currentlyWorking');
            }
        }
        if (i === 1) {
            if (statusText[i].dataset.status === order.status) {
                statusText[i - 1].innerHTML = '( Completed )';
                statusText[i - 1].classList.add('completed');
                statusText[i].innerHTML = '( Completed )';
                statusText[i].classList.add('completed');
                statusText[i + 1].innerHTML = '( inProgress )';
                statusText[i + 1].classList.add('currentlyWorking');
            }
        }
        if (i === 2) {
            if (statusText[i].dataset.status === order.status) {
                statusText[i - 2].innerHTML = '( Completed )';
                statusText[i - 2].classList.add('completed');
                statusText[i - 1].innerHTML = '( Completed )';
                statusText[i - 1].classList.add('completed');
                statusText[i].innerHTML = '( Completed )';
                statusText[i].classList.add('completed');
                statusText[i + 1].innerHTML = '( inProgress )';
                statusText[i + 1].classList.add('currentlyWorking');
            }
        }
        if (i === 3) {
            if (statusText[i].dataset.status === order.status) {
                statusText[i - 3].innerHTML = '( Completed )';
                statusText[i - 3].classList.add('completed');
                statusText[i - 2].innerHTML = '( Completed )';
                statusText[i - 2].classList.add('completed');
                statusText[i - 1].innerHTML = '( Completed )';
                statusText[i - 1].classList.add('completed');
                statusText[i].innerHTML = '( Completed )';
                statusText[i].classList.add('completed');
                statusText[i + 1].innerHTML = '( inProgress )';
                statusText[i + 1].classList.add('currentlyWorking');
            }
        }
        if (i === 4) {
            if (statusText[i].dataset.status === order.status) {
                statusText[i - 4].innerHTML = '( Completed )';
                statusText[i - 4].classList.add('completed');
                statusText[i - 3].innerHTML = '( Completed )';
                statusText[i - 3].classList.add('completed');
                statusText[i - 2].innerHTML = '( Completed )';
                statusText[i - 2].classList.add('completed');
                statusText[i - 1].innerHTML = '( Completed )';
                statusText[i - 1].classList.add('completed');
                statusText[i].innerHTML = '( Completed )';
                statusText[i].classList.add('completed');
            }
        }
    }
}

updateStatus(order);