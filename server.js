const express = require("express");
const app = express();
require('dotenv').config()
const path = require("path");
const ejs = require("ejs")
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const mongoDbStore = require("connect-mongo");
const Emitter = require("events");
const home = require("./routes/home");
const signup = require("./routes/signup");
const login = require("./routes/login");
const admin = require("./routes/admin");
const cart = require("./routes/cart");
const logout = require("./routes/logout");
const order = require("./routes/order");
const customerOrders = require("./routes/customerOrders");
const customerOrderStatus = require("./routes/customerOrderStatus");



// Database connection---
mongoose.connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});


// Session Config----
app.use(session({
    secret: process.env.session_secret_key,
    resave: false,
    store: mongoDbStore.create({ mongoUrl: process.env.db_url, collectionName: "sessions" }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// Events emitter----
const eventEmitter = new Emitter()
app.set("eventEmitter", eventEmitter);


// Set template engine-----
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes---
app.use("/", home);
app.use("/signup", signup);
app.use("/login", login);
app.use("/admin", admin);
app.use("/cart", cart);
app.use("/logout", logout);
app.use("/order", order);
app.use("/customer-orders", customerOrders);
app.use("/customer-order/status", customerOrderStatus);


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Socket setup----





const io = require("socket.io")(server);
io.on("connection", socket => {
    socket.on("join", orderId => {
        socket.join(orderId);
        console.log(orderId)
    });
});

eventEmitter.on("updateOrder", (data) => {
    io.to(`order_${data.order_id}`).emit("orderUpdated", data);
    console.log(data.order_id)

});




