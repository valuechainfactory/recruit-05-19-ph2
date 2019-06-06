window.onload = function () {
    showSalesSection();
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
    alert(error);
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

function findAllProcessedOrders() {
    axios.get(baseUrl + '/orders/processed')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function findAllPendingOrders() {
    axios.get(baseUrl + '/orders/pending')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function findAllOrders() {
    axios.get(baseUrl + '/orders/all')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function findAllSales() {
    axios.get(baseUrl + '/sales/all')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function emulateSale() {
    axios.get(baseUrl + '/products/list')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function emulateDispatch() {
    axios.get(baseUrl + '/products/list')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            handleError(error);
        });
}