const baseUrl = window.location.origin;
window.onload = function () {

    if (!localStorage.getItem('token')) {
        showLogin();
    } else {
        afterLogin();
    }
    document.getElementById("loginBtn").addEventListener("click", function (event) {
        event.preventDefault();
        loginUser();
    });
    var socket = io();
    socket.on('newSale', () => {
        refreshAll()
    });
    socket.on('saleCreated', () => {
        refreshAll()
    });
    socket.on('purchaseOrderCreated', () => {
        refreshAll()
    });
    socket.on('productAdded', () => {
        refreshAll()
    });
    socket.on('purchaseOrderUpdated', () => {
        refreshAll()
    });
};



