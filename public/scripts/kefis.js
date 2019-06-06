window.onload = function () {
    showSalesSection();
    var socket = io();

    socket.on('newSale', () => {
        console.log('here');
    });
    socket.on('saleCreated', () => {
        console.log('saleCreated');
    });
    socket.on('purchaseOrderCreated', () => {
        console.log('purchaseOrderCreated');
    });
    socket.on('productAdded', () => {
        console.log('productAdded');
    });
};
const baseUrl = "http://localhost:3000";

function showSalesSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').show();
    findAllSales();
}

function showProductsSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').show();
    $('#salesSection').hide();
    findAllProductsForSale();
}

function showPendingOrdersSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').show();
    $('#availableProducts').hide();
    $('#salesSection').hide();
    findAllPendingOrders()
}

function showProcessedOrdersSections() {
    $('#allOrders').hide();
    $('#processedOrders').show();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').hide();
    findAllProcessedOrders()
}

function showAllOrdersSection() {
    $('#allOrders').show();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').hide();
    findAllOrders()
}

function handleError(error) {
    new Toast({
        message: error.message,
        type: 'danger'
    });
}

function showNotification(message) {
    new Toast({
        message: message,
        type: 'success'
    });
}

function findAllProductsForSale() {
    axios.get(baseUrl + '/products/forSale')
        .then(function (response) {
            displayProductsForSale(response.data)
        })
        .catch(function (error) {
            handleError(error);
        });
}


function findAllProcessedOrders() {
    axios.get(baseUrl + '/orders/processed')
        .then(function (response) {
            displayProcessedOrders(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}


function findAllPendingOrders() {
    axios.get(baseUrl + '/orders/pending')
        .then(function (response) {
            displayPendingOrders(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function formatDate(input) {
    let date = new Date(input);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
        date.getDate() + " " + date.getHours() + ":"
        + date.getMinutes() + ":" + date.getSeconds();
}


function findAllOrders() {
    axios.get(baseUrl + '/orders/all')
        .then(function (response) {
            displayAllOrders(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}


function processedStatus(status) {
    if (status === 'Y') {
        return 'YES';
    } else {
        return 'NO';
    }
}

function findAllSales() {
    axios.get(baseUrl + '/sales/all')
        .then(function (response) {
            displaySales(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}


function emulateSale(productID) {
    axios.post(baseUrl + '/sales/new', {
        quantity: 1,
        productId: productID
    }).then(function () {
        findAllProductsForSale();
    }).catch(function (error) {
        findAllProductsForSale();
    });
    showNotification("Sale Completed");
}

function emulateDispatch(orderId) {
    axios.put(baseUrl + '/orders/update',
        {
            id: orderId,
            processed: 'Y'
        })
        .then(function () {
            showNotification("Order Dispatched!");
            findAllPendingOrders();
        })
        .catch(function (error) {
            handleError(error);
        });
}

function displaySales(sales) {
    $('#salesTable').find("tr:gt(0)").remove();
    if (sales.length > 0) {
        for (var i = 0; i < sales.length; i++) {
            const row = '<tr>' +
                '<td>' + sales[i].product.name + '</td>' +
                '<td>' + sales[i].quantity + '</td>' +
                '<td>' + sales[i].createdAt + '</td>' +
                '</tr>';
            $('#salesTable tr:last').after(row);
        }
    } else {
        const row = '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>';
        $('#salesTable tr:last').after(row);
    }
}

function displayAllOrders(orders) {
    $('#allOrdersTable').find("tr:gt(0)").remove();
    if (orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
            const row = '<tr>' +
                '<td>' + orders[i].product.name + '</td>' +
                '<td>' + orders[i].orderQuantity + '</td>' +
                '<td>' + formatDate(orders[i].createdAt) + '</td>' +
                '<td>' + processedStatus(orders[i].processed) + '</td>' +
                '<td>' + formatDate(orders[i].updatedAt) + '</td>' +
                '<td>#</td>' +
                '<td></td>' +
                '</tr>';
            $('#allOrdersTable tr:last').after(row);
        }
    } else {
        const row = '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>';
        $('#allOrdersTable tr:last').after(row);
    }
}

function displayPendingOrders(orders) {
    $('#pendingOrdersTable').find("tr:gt(0)").remove();
    if (orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
            const row = '<tr>' +
                '<td>' + orders[i].product.name + '</td>' +
                '<td>' + orders[i].orderQuantity + '</td>' +
                '<td>' + formatDate(orders[i].createdAt) + '</td>' +
                '<td><button class="btn btn-primary" onclick="emulateDispatch(' + orders[i].id + ')">Dispatch' +
                ' Order</button>' +
                ' </td>' +
                '<td></td>' +
                '</tr>';
            $('#pendingOrdersTable tr:last').after(row);
        }
    } else {
        const row = '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>';
        $('#pendingOrdersTable tr:last').after(row);
    }
}

function displayProcessedOrders(orders) {
    $('#processedOrdersTable').find("tr:gt(0)").remove();
    if (orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
            const row = '<tr>' +
                '<td>' + orders[i].product.name + '</td>' +
                '<td>' + orders[i].orderQuantity + '</td>' +
                '<td>' + formatDate(orders[i].createdAt) + '</td>' +
                '<td>' + formatDate(orders[i].updatedAt) + '</td>' +
                '<td>#</td>' +
                '<td></td>' +
                '</tr>';
            $('#processedOrdersTable tr:last').after(row);
        }
    } else {
        const row = '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>';
        $('#processedOrdersTable tr:last').after(row);
    }
}

function displayProductsForSale(products) {
    $('#productsTable').find("tr:gt(0)").remove();
    if (products.length > 0) {
        for (var i = 0; i < products.length; i++) {
            const row = '<tr>' +
                '<td>' + products[i].product.name + '</td>' +
                '<td>' + products[i].product.reorderLevel + '</td>' +
                '<td>' + products[i].stockQuantity + '</td>' +
                '<td><button class="btn btn-primary" onclick="emulateSale(' + products[i].product.id + ')">Sell' +
                ' Product</button>' +
                ' </td>' +
                '<td></td>' +
                '</tr>';
            $('#productsTable tr:last').after(row);
        }
    } else {
        const row = '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>';
        $('#productsTable tr:last').after(row);
    }
}
