const axios = require('axios');
const moment = require('moment');

function initAdmin() {
    const adminTable = document.querySelector('#adminOrderTableBody');
    let orders = [];
    let markUp;

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data,
            markUp = generateMarkup(orders),
            adminTable.innerHTML = markUp
    }).catch(err => {
        console.log(err);
    })

    function renderItems(items) {
        let itemsValues = Object.values(items);
        return itemsValues.map((menuItem) => {
            return `
                <p>${menuItem.item.name}-${menuItem.qty}</p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                    <td class="border">
                        <p>${order._id}</P>
                        <div>${renderItems(order.items)}</div>
                    </td>
                    <td class="border">
                        ${order.customerId.name}
                    </td>
                    <td class="border">
                        ${order.address}
                    </td>
                    <td class="border">
                        ${order.phoneNumber}
                    </td>
                    <td>
                        <div>
                            <form action="/admin/order/status" method="post">
                                <input type="hidden" name="orderId" value="${order._id}">
                                    <select name="status" onchange="this.form.submit()" class="form-select" aria-label="Default select example">
                                            <option value="order_Placed" ${order.status === 'order_Placed' ? 'selected' : ''}>
                                                Placed</option>
                                            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                                Confirmed</option>
                                            <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                                Prepared</option>
                                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                                Delivered
                                            </option>
                                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                                Completed
                                            </option>
                                    </select>
                            </form>
                        </div>
                    </td>
                    <td class="border">
                        ${moment(order.createdAt).format('hh:mm A')}
                    </td>
                </tr>
            `
        }).join('')
    }
}

module.exports = initAdmin;