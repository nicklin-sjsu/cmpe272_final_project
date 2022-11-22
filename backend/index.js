//imports
const express = require("express");

// express app initialized
const app = express();

// import routes
const userRoute = require("./routes/UserRoute");

// middleware
app.use(express.json());

// routes
app.use("/api/user", userRoute);

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