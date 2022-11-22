const express = require('express');
const excelJS = require('exceljs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const { name, enrollment_no, discipline, attitude, maintenance } = req.body;


    const fileName = "./test.xlsx";
    const workbook = new excelJS.Workbook();
    
    workbook.xlsx.readFile(fileName)
        .then(() => {
            const worksheet = workbook.getWorksheet(1);
            const lastRow = worksheet.lastRow;
            const getRowInsert = worksheet.getRow(++(lastRow.number));
            getRowInsert.getCell(1).value = name;
            getRowInsert.getCell(2).value = enrollment_no;
            getRowInsert.getCell(3).value = discipline;
            getRowInsert.getCell(4).value = attitude;
            getRowInsert.getCell(5).value = maintenance;
            getRowInsert.commit();
            workbook.xlsx.writeFile(fileName);
            res.send('Data inserted successfully');
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
