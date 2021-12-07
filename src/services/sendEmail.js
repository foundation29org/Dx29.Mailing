'use strict';

const sgMail = require('@sendgrid/mail')
const https = require('https');
let appInsights = require('applicationinsights');

let secrets = require('./../secrets/appsettings.secrets');

appInsights.setup(secrets.AppInsights.Key).setAutoCollectRequests(false);
appInsights.start();
let clientInsights = appInsights.defaultClient;

const sendGridAPIKey = secrets.SendGrid.APIKey;
sgMail.setApiKey(sendGridAPIKey)

async function send(structureEmail) {
  return new Promise(function (resolve, reject) {
    if (!structureEmail) { return null; }
    var promises = [];
    if (structureEmail.attachments.length > 0) {
      for (var attachment in structureEmail.attachments) {
        // Download data of attachments
        promises.push(downloadFile(structureEmail.attachments[attachment], attachment));
      }
    }

    Promise.all(promises)
      .then(function (data) {
        var p1 = new Promise(
          function (resolve2) {

            var From = structureEmail.params.From;
            var To = structureEmail.params.To;
            var CC = structureEmail.params.CC;
            var BCC = structureEmail.params.BCC;
            var ReplyTo = structureEmail.params.ReplyTo;
            var Subject = structureEmail.params.Subject;
            var body = structureEmail.content
            var msg = {}
            // if have attachments
            if (structureEmail.attachments.length > 0) {
              msg = {
                to: To,
                cc: CC,
                bcc: BCC,
                replyTo: ReplyTo,
                from: From,
                subject: Subject,
                html: body,
                attachments: data,
              }
              // if dont have attachments
            } else {
              msg = {
                to: To,
                cc: CC,
                bcc: BCC,
                replyTo: ReplyTo,
                from: From,
                subject: Subject,
                html: body,
              }
            }

            //send email
            sgMail
              .send(msg)
              .then((response) => {
                resolve2(response[0])
              })
              .catch((error) => {
                resolve2(error)
              })
          }
        );

        p1.then(
          // Promise OK
          function (val) {
            if (val.statusCode) {
              resolve({ status: val.statusCode, title: "Sent" })
            } else {
              if (val.code == undefined) {
                val.code = 400;
              }
              clientInsights.trackEvent({ name: 'mailing', properties: { status: val.code, message: val.message, inforeq: structureEmail } });
              var temp = JSON.parse(clientInsights.channel._buffer[0])
              resolve({ type: "https://tools.ietf.org/html/rfc7231#section-6.5.4", status: val.code, title: val.message, traceId: temp.tags['ai.operation.id'] })
            }
          })
          .catch(
            // Promise ERROR
            function (reason) {
              console.log('Manejar promesa rechazada (' + reason + ') aquí.');
              return null;
            });
      })
      .catch(function (err) {
        console.log('Manejar promesa rechazada2 (' + err + ') aquí.');
        clientInsights.trackEvent({ name: 'mailing', properties: { status: 400, message: err, inforeq: structureEmail } });
        var temp = JSON.parse(clientInsights.channel._buffer[0])
        reject({ type: "https://tools.ietf.org/html/rfc7231#section-6.5.4", status: 400, title: 'Unable to determine the domain name', traceId: temp.tags['ai.operation.id'] })
      });

  });
}


function downloadFile(file, index) {
  return new Promise(function (resolve, reject) {
    var indexInicio = file.lastIndexOf('/');
    var indexFinal = file.indexOf('?');
    var nameFile = file.substring(indexInicio + 1, indexFinal)
    const request = https.get(file, function (response, error) {
      if (response.statusCode == '200') {
        var contentType = response.headers['content-type']
        var data = [];
        if (error) {
          resolve(error);
        } else {
          response.on('data', function (chunk) {
            data.push(chunk);
          });
          response.on('end', function () {
            data = Buffer.concat(data);
            var res = {
              content: data.toString('base64'),
              filename: nameFile,
              type: contentType,
              disposition: 'attachment',
              content_id: index + 'mytext'
            }
            resolve(res);
          });
        }
      } else {
        resolve(error);
      }
    });
  });
}

module.exports = {
  send
}
