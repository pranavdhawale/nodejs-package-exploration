var { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }
});

async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1j9j26-B9c1NIZ7YcNrhVISXJHxfrFDFbTnveu6-zPfo',
        range: 'A2:B5'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values);
}