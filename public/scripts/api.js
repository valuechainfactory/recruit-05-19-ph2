const config = {
    headers: {'Authorization': "bearer " + localStorage.getItem('token')}
};

function loginUser() {
    axios.post(baseUrl + '/api/login', {
            username: $('#inputUsername').val(),
            password: $('#inputPassword').val()
        },
        {
            headers: {
                'Content-Type':
                    'application/json; charset=UTF-8'
            }
        }
    ).then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('Kefisusername', response.data.username);
        localStorage.setItem('KefisRole', response.data.role);
        afterLogin(response.data.username, response.data.role);
    })
        .catch(error => {
            handleError(error.response.data.message);
        });
}

function findAllSales() {
    axios.get(baseUrl + '/sales/all', config)
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
    }, config).then(function () {
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
        }, config)
        .then(function () {
            showNotification("Order Dispatched!");
            findAllPendingOrders();
        })
        .catch(function (error) {
            handleError(error);
        });
}

function findAllOrders() {
    axios.get(baseUrl + '/orders/all', config)
        .then(function (response) {
            displayAllOrders(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}

function findAllProductsForSale() {
    axios.get(baseUrl + '/products/forSale', config)
        .then(function (response) {
            displayProductsForSale(response.data)
        })
        .catch(function (error) {
            handleError(error);
        });
}


function findAllProcessedOrders() {
    axios.get(baseUrl + '/orders/processed', config)
        .then(function (response) {
            displayProcessedOrders(response.data);
        })
        .catch(function (error) {
            handleError(error);
        });
}


function findAllPendingOrders() {
    axios.get(baseUrl + '/orders/pending', config)
        .then(function (response) {
            displayPendingOrders(response.data);
        })
        .catch(function (error) {
            console.log(error);
            handleError(error);
        });
}