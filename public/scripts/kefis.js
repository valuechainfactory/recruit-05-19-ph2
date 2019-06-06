window.onload = function () {
   showSalesSection();
};

function showSalesSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').show();
}

function showProductsSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').show();
    $('#salesSection').hide();
}

function showPendingOrdersSection() {
    $('#allOrders').hide();
    $('#processedOrders').hide();
    $('#pendingOrders').show();
    $('#availableProducts').hide();
    $('#salesSection').hide();
}

function showProcessedOrdersSections() {
    $('#allOrders').hide();
    $('#processedOrders').show();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').hide();
}

function showAllOrdersSection() {
    $('#allOrders').show();
    $('#processedOrders').hide();
    $('#pendingOrders').hide();
    $('#availableProducts').hide();
    $('#salesSection').hide();
}