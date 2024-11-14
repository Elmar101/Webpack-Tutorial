const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');   
const port = 3000;


app.use("/static",express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/home.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf8');
    res.send(contentFromHtmlFile);
});

app.get('/home', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/home.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf8');
    res.send(contentFromHtmlFile);
});

app.get('/image', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/image.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf8');
    res.send(contentFromHtmlFile);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});