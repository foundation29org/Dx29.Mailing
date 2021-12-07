const sendgridCntrl = require('../controllers/sendgrid')
const aboutCntrl = require('../controllers/about')
const testCntrl = require('../services/test')

const express = require('express')
const api = express.Router();


// get version
api.get('/version', aboutCntrl.getVersion)

// Send email
api.post('/sendemail', sendgridCntrl.sendEmail)

//test service
api.get('/test', testCntrl.launchTestAPI)

module.exports = api;
