require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000

console.log('logs', process.env.REACT_APP_USER_LOCATION)

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port)