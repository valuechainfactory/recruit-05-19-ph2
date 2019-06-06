function showLogin() {
    $('#navigation').hide();
    $('#mainApp').hide();
    $('#loginDiv').show();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('KefisRole');
    localStorage.removeItem('Kefisusername');
    $('#navigation').hide();
    $('#mainApp').hide();
    $('#loginDiv').show();
}

function afterLogin() {
    $('#loginDiv').hide();
    $('#navigation').show();
    $('#mainApp').show();

    const role = localStorage.getItem('KefisRole');
    if (role === 'Retailer') {
        document.getElementById("appLinks").children[0].style.display="";
        document.getElementById("appLinks").children[1].style.display="";
        document.getElementById("appLinks").children[2].style.display="";
        document.getElementById("appLinks").children[3].style.display="";
        document.getElementById("appLinks").children[4].style.display="";
        showSalesSection();
    } else if (role === 'WareHouseAttendant') {
        document.getElementById("appLinks").children[0].style.display="none";
        document.getElementById("appLinks").children[1].style.display="none";
        document.getElementById("appLinks").children[2].style.display="";
        document.getElementById("appLinks").children[3].style.display="none";
        document.getElementById("appLinks").children[4].style.display="none";
        showPendingOrdersSection();
    }

}

function refreshAll() {
    findAllSales();
    findAllPendingOrders();
    findAllOrders();
    findAllProcessedOrders();
    findAllProductsForSale();
}


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


function displaySales(sales) {
    $('#salesTable').find("tr:gt(0)").remove();
    if (sales.length > 0) {
        for (var i = 0; i < sales.length; i++) {
            const row = '<tr>' +
                '<td>' + sales[i].product.name + '</td>' +
                '<td>' + sales[i].quantity + '</td>' +
                '<td>' + formatDate(sales[i].createdAt) + '</td>' +
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
                '<td>' + canDispatchOrder(orders[i].id) + '</td>' +
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

function canDispatchOrder(id) {
    const role = localStorage.getItem('KefisRole');
    if (role === 'Retailer') {
        return ''
    } else if (role === 'WareHouseAttendant') {
        return '<button class="btn btn-primary" onclick="emulateDispatch(' + id + ')">Dispatch' +
            ' Order</button>'
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

