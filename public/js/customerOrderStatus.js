socket = io();
let status_value = document.querySelector(".status_value");
let status = status_value.value;


function updateStatus(status) {
    let getElement = document.querySelector(`.${status}`);
    getElement.classList.add("completed");
};
updateStatus(status);


let order_id = document.querySelector(".order_id");

let id = order_id.value;

// Socket----

socket.emit("join", `order_${id}`);

socket.on("orderUpdated", (data) => {
    console.log(data);
    updateStatus(data.status);
});

