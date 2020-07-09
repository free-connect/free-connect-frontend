require('dotenv').config();

const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port)