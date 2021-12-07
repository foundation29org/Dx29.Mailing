'use strict'

var sendEmailService = require('../services/sendEmail')
var validateQueryService = require('../services/validateQuery')

function sendEmail(req, res) {
  return launch(req, res)
}

async function launch(req, res) {
  var Content = req.body;
  var attachments = [];
  if (req.headers) {
    if (req.headers['dx-attachments']) {
      var attachmentstemp = req.headers['dx-attachments'];
      attachments = attachmentstemp.split(',')
    }
  }

  var structureEmail = { params: req.query, content: Content, attachments: attachments }
  var result = validate(structureEmail)
  if (result.status !== 200) {
    return res.status(result.status).send(result.send)
  }
  else {
    var resultFind = await extract(structureEmail);
    console.log('FINAL');
    console.log(resultFind);
    return res.status(200).send(resultFind)
  }

}

function extract(structureEmail) {
  return new Promise(async function (resolve, reject) {
    try {
      let resultWithFreqExe = await sendEmailService.send(structureEmail);
      console.log(resultWithFreqExe)
      return resolve(resultWithFreqExe);
    } catch (error) {
      return resolve(error);
    }


  });
}

function validate(structureEmail) {
  var result = {};
  // Cases with error or not information
  var message = validateQueryService.checkQueryParams({ From: structureEmail.params.From, To: structureEmail.params.To, Subject: structureEmail.params.Subject, content: structureEmail.content })
  if (message !== null) {
    result = { status: 404, send: { message: message } }
  }
  else {
    result = { status: 200 }
  }
  return result;
}


module.exports = {
  sendEmail
}
