const csvParser = require("csv-parser");
const fs = require("fs");
const expectedColumns = ['product', 'amount'];

const isValidCSV = async (pathOfFile) => {
    const parsedData = [];
    let isValid = true;

    const checkCSV = (data) => {
        const keys = Object.keys(data);
        if (keys.length !== expectedColumns.length || keys.some(key => !expectedColumns.includes(key))) {
            isValid = false;
        }
        if (data['product'] && data['amount']) {
            if (data['product'].toString().indexOf(" ") >= 0 || data['amount'].toString().indexOf(" ") >= 0) {
                isValid = false;
            }
        } else {
            isValid = false;
        }
        parsedData.push(data);
    };

    try {
        await new Promise((resolve, reject) => {
            fs.createReadStream(pathOfFile)
                .pipe(csvParser())
                .on('data', checkCSV)
                .on('end', () => resolve(isValid))
                .on('error', reject);
        });
        return { isValid, parsedData };
    } catch (err) {
        return { isValid: false, parsedData: [] };
    }
};

module.exports = { isValidCSV };