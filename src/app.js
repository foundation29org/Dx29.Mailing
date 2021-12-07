const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes')



//CORS middleware
function setCrossDomain(req, res, next) {
    //instead of * you can define ONLY the sources that we allow.
    res.header('Access-Control-Allow-Origin', '*');
    //http methods allowed for CORS.
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin, Accept, Accept-Language, Origin, User-Agent');
    //res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
app.use(bodyParser.text({ type: 'text/html', limit: '50mb' }))
app.use(setCrossDomain);
app.use('/api',api)

module.exports = app
