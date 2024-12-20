const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');   
const port = 9001;


// app.use("/static",express.static(path.resolve(__dirname, '../dist')));
app.use("/",express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/home.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf8');
    res.send(contentFromHtmlFile);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});