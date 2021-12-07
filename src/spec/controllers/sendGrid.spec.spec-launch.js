//const REQUEST = require("request");
var request = require('request');
const BASE_URL = "http://localhost:8080"

var input_ok = require('./Inputs/input.json')
var expectedOutputSendgrid_ok = require('./ExpectedOutputs/sendgrid_request.json');
var input_ko = require('./Inputs/input_ko.json')
var expectedOutputSendgrid_ko = require('./ExpectedOutputs/sendgrid_request_ko.json');


const INPUT_ALL_KEYS = input_ok.allKeys;
const INPUT_WITHOUT_ATTACHMENTS = input_ok.withoutAttachments;
const INPUT_ONLY_REQUIRED = input_ok.onlyRequired;

const OUTPUT_ALL_KEYS = expectedOutputSendgrid_ok.allKeys;
const OUTPUT_WITHOUT_ATTACHMENTS = expectedOutputSendgrid_ok.withoutAttachments;
const OUTPUT_ONLY_REQUIRED = expectedOutputSendgrid_ok.onlyRequired;


const INPUT_NO_REQUIRED_KO = input_ko.AllKeys_NotRequireds;
const INPUT_BAD_FIELDS_KO = input_ko.AllKeys_butRequiredsBadFields;
const INPUT_INACCESSIBLE_URL_KO = input_ko.AllKeys_butInaccessibleUrlAttachment;
const INPUT_INCORRECT_URL_KO = input_ko.AllKeys_butIncorrectUrlAttachment;

const OUTPUT_NO_REQUIRED_KO = expectedOutputSendgrid_ko.AllKeys_NotRequireds;
const OUTPUT_BAD_FIELDS_KO = expectedOutputSendgrid_ko.AllKeys_butRequiredsBadFields;
const OUTPUT_INACCESSIBLE_URL_KO = expectedOutputSendgrid_ko.AllKeys_butInaccessibleUrlAttachment;
const OUTPUT_INCORRECT_URL_KO = expectedOutputSendgrid_ko.AllKeys_butIncorrectUrlAttachment;

const TEST_EMAIL_OK = [
    { "type": "Send email with all parameters and atachhments", "input": INPUT_ALL_KEYS, "expectedOutput": OUTPUT_ALL_KEYS },
    { "type": "Send email without atachhments", "input": INPUT_WITHOUT_ATTACHMENTS, "expectedOutput": OUTPUT_WITHOUT_ATTACHMENTS },
    { "type": "Send email only qith required parameters", "input": INPUT_ONLY_REQUIRED, "expectedOutput": OUTPUT_ONLY_REQUIRED },
]

const TEST_EMAIL_KO = [
    { "type": "Calcule score with no genes key input", "input": INPUT_NO_REQUIRED_KO, "expectedOutput": OUTPUT_NO_REQUIRED_KO },
    { "type": "Calcule score with no symptoms key input", "input": INPUT_BAD_FIELDS_KO, "expectedOutput": OUTPUT_BAD_FIELDS_KO },
    { "type": "Calcule score with no key input", "input": INPUT_INACCESSIBLE_URL_KO, "expectedOutput": OUTPUT_INACCESSIBLE_URL_KO },
    { "type": "Calcule score with genes no name key input", "input": INPUT_INCORRECT_URL_KO, "expectedOutput": OUTPUT_INCORRECT_URL_KO }
]

describe('[SendEmail Controller requests]', () => {
    describe('[sendEmail function]', () => {
        describe('[Correct values]', () => {
            function sendEmail(test) {
                it(test.type, (done) => {
                    const url = BASE_URL + "/api/sendemail";
                    var expectedOutput = test.expectedOutput;
                    var bodyRequest = test.input.body;
                    var attachments = []
                    if(test.input.headers!=undefined){
                        attachments = test.input.headers['dx-attachments']
                    }
                    
                    var queryParams = ''
                    var obj = test.input.query;
                    var size = 0;
                    for (var key in obj){
                        size++;
                    }
                    var index = 0;
                    for (var key in obj){
                        var value = obj[key];
                        queryParams=queryParams+key+"="+value;
                        if(index<size-1){
                            queryParams=queryParams+"&"
                        }
                        index++
                    }    
                    var options = {
                        'method': 'POST',
                        'url': 'http://localhost:8080/api/sendemail?'+queryParams,
                        'headers': {
                          'dx-attachments': attachments,
                          'Content-Type': 'text/html'
                        },
                        body: bodyRequest
                      
                      }; 
                      
                      request(options, function (error, response) {
                        if(!error){
                            var parseResult = JSON.parse(response.body)
                            expect(parseResult.status).toBe(202)
                            //expect(result).toEqual(expectedOutput);
                            done();
                        }
                      });
                }, 10000);
            }
            for (var test of TEST_EMAIL_OK) {
                sendEmail(test);
            }
        });
        describe('[Error values]',()=>{
            function sendEmail(test) {
                it(test.type, (done) => {
                    const url = BASE_URL + "/api/sendemail";
                    var expectedOutput = test.expectedOutput;
                    var bodyRequest = test.input.body;
                    var attachments = []
                    if(test.input.headers!=undefined){
                        attachments = test.input.headers['dx-attachments']
                    }
                    
                    var queryParams = ''
                    var obj = test.input.query;
                    var size = 0;
                    for (var key in obj){
                        size++;
                    }
                    var index = 0;
                    for (var key in obj){
                        var value = obj[key];
                        queryParams=queryParams+key+"="+value;
                        if(index<size-1){
                            queryParams=queryParams+"&"
                        }
                        index++
                    }    
                    var options = {
                        'method': 'POST',
                        'url': 'http://localhost:8080/api/sendemail?'+queryParams,
                        'headers': {
                          'dx-attachments': attachments,
                          'Content-Type': 'text/html'
                        },
                        body: bodyRequest
                      
                      }; 
                      
                      request(options, function (error, response) {
                        if(!error){
                            var parseResult = JSON.parse(response.body)
                            //console.log(parseResult);
                            expect(parseResult.status).toBe(400)
                            //expect(result).toEqual(expectedOutput);
                            done();
                        }
                      });
                }, 10000);
            }
            for (var test of TEST_EMAIL_KO) {
                sendEmail(test);
            }

        })
    });
});


