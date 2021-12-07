var request = require('request');
async function launchTestAPI(req, res) {
    //data input
    var attachments = "https://dx29dev.blob.core.windows.net/mailings/sample.txt?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D";
    //var attachments = "https://dx29dev.blob.core.windows.net/mailings/sample.txt?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D,https://dx29dev.blob.core.windows.net/mailings/errores.docx?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D,https://dx29dev.blob.core.windows.net/mailings/tabaco.png?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D";
    var query = {
        "From": "dev@foundation29.org",
        "To": "javier.logrono@foundation29.org",
        "CC": "marta.herrantz@foundation29.org",
        "BCC": "support@foundation29.org",
        "Subject": "Sending with SendGrid is Fun",
        "ReplyTo": "javier.logrono@foundation29.org"
    };
    var bodyRequest = 'Javi, <strong>and easy to do anywhere, even with Node.js</strong>';

    //call service
    var queryParams = ''
    var size = 0;
    for (var key in query) {
        size++;
    }
    var index = 0;
    for (var key in query) {
        var value = query[key];
        queryParams = queryParams + key + "=" + value;
        if (index < size - 1) {
            queryParams = queryParams + "&"
        }
        index++
    }
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/api/sendemail?' + queryParams,
        'headers': {
            'dx-attachments': attachments,
            'Content-Type': 'text/html'
        },
        body: bodyRequest

    };

    //result
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        return res.status(200).send(response.body)
    });
}

async function launchTest() {
    //data input
    var attachments = "https://dx29dev.blob.core.windows.net/mailings/sample.txt?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D";
    //var attachments = "https://dx29dev.blob.core.windows.net/mailings/sample.txt?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D,https://dx29dev.blob.core.windows.net/mailings/errores.docx?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D,https://dx29dev.blob.core.windows.net/mailings/tabaco.png?sp=rl&st=2021-04-19T14:21:42Z&se=2022-04-20T14:21:00Z&sv=2020-02-10&sr=c&sig=os5AcvHwnA8O6AzW6UzNnajupysenSBInT%2BbPww2x6A%3D";
    var query = {
        "From": "dev@foundation29.org",
        "To": "javier.logrono@foundation29.org",
        "CC": "marta.herrantz@foundation29.org",
        "BCC": "support@foundation29.org",
        "Subject": "Sending with SendGrid is Fun",
        "ReplyTo": "javier.logrono@foundation29.org"
    };
    var bodyRequest = 'Javi, <strong>and easy to do anywhere, even with Node.js</strong>';

    //call service
    var queryParams = ''
    var size = 0;
    for (var key in query) {
        size++;
    }
    var index = 0;
    for (var key in query) {
        var value = query[key];
        queryParams = queryParams + key + "=" + value;
        if (index < size - 1) {
            queryParams = queryParams + "&"
        }
        index++
    }
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/api/sendemail?' + queryParams,
        'headers': {
            'dx-attachments': attachments,
            'Content-Type': 'text/html'
        },
        body: bodyRequest

    };

    //result
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

module.exports = {
    launchTestAPI,
    launchTest
}