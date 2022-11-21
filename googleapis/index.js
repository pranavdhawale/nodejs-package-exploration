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
    let dataArray = data.data.values;
    // console.log(dataArray);
    let newDataArray = dataArray.map(function(r) {
        r.push(r[0] + '-' + r[1]);
        return r;
    })
    // console.log(newDataArray);
    
    const update = {
        spreadsheetId: '1j9j26-B9c1NIZ7YcNrhVISXJHxfrFDFbTnveu6-zPfo',
        range: 'C2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray }
    };

    let res = await gsapi.spreadsheets.values.update(update);
    console.log(res);
}