const express = require('express');
const app = express();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('dotenv').config();
require('./startup/prod.js')(app);
const port = process.env.PORT || 8000;

if (!process.env.jwtPrivateKey && !process.env.jwtRefreshKey) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
}

app.listen(port, ()=> console.log(`Listening on port ${port}`));