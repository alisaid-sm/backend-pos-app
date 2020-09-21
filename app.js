const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const appRouter = require('./src/router/approuter')

const { PORT } = require('./src/helper/env')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app
    .use('/api/v1', appRouter)
    .use(express.static('src/upload'))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
