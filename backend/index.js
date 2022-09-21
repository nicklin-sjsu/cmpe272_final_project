const express = require("express");

// express app initialized
const app = express();

app.get('/', (req, res) => {
    console.log('GET Received')
    res.send('Hello World!')
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


module.exports = app;