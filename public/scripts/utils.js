function formatDate(input) {
    let date = new Date(input);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
        date.getDate() + " " + date.getHours() + ":"
        + date.getMinutes() + ":" + date.getSeconds();
}

function processedStatus(status) {
    if (status === 'Y') {
        return 'YES';
    } else {
        return 'NO';
    }
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
