/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouter = require('./src/router/approuter');
const { PORT } = require('./src/helper/env');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
// var history = require('connect-history-api-fallback');
const app = express();

// app.use(express.static(path.join(__dirname, './dist')));
// app.use('*', (req, res) => {
//     res.sendFile(__dirname, './dist/index.html');
// });

// Support history api 
// app.use(history());
app.use(express.static(path.join(__dirname, './dist')));
app.use('/' || '/login' || '/regiter' || '/history', (req, res) => {
    res.sendFile(__dirname, './dist/index.html');
});

// app.use(staticFileMiddleware);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app
    .use('/api/v1', appRouter)
    .use(express.static('src/upload'));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
