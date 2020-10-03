const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const appRouter = require('./src/router/approuter');

const { PORT } = require('./src/helper/env');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');

const app = express();

// eslint-disable-next-line no-undef
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
