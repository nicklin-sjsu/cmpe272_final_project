//imports
const express = require("express");
var cors = require('cors');

// express app initialized
const app = express();

// import routes
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const searchRoute = require("./routes/SearchRoute");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/search", searchRoute);

// default route
app.get('/', (req, res) => {
    console.log('GET Received')
    res.send('DEFAULT ROUTE!')
});

// listen for requests
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});

module.exports = app;