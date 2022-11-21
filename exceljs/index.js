var { google } = require('googleapis');
const keys = require('./keys.json');
const Excel = require('exceljs');

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

    const wb = new Excel.Workbook();
    let excelFile = await wb.xlsx.readFile('text.xlsx')
    
    // get data from Sheet1
    let sheet1 = excelFile.getWorksheet('Sheet1');
    let data1 = sheet1.getSheetValues();

    // discard 1 empty item from each row
    data1 = data1.map(function(r) {
        return [r[1],r[2],r[3],r[4],r[5]]
    });

    // discard sheet 1 empty item
    data1.shift();
    // console.log(data1);
    
    //update function
    const update = {
        spreadsheetId: '1j9j26-B9c1NIZ7YcNrhVISXJHxfrFDFbTnveu6-zPfo',
        range: 'LocalExcelData!A1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: data1 }
    };

    let res = await gsapi.spreadsheets.values.update(update);
}