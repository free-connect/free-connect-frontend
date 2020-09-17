require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000

//uncomment when pushing to github

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }

app.use(requireHTTPS)

// app.use((req, res, next) => {
//     res.set({
//         'Content-Security-Policy': "script-src 'self', frame-ancestors 'none', X-Content-Type-Options 'nosniff'"
//     })
// })

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port)