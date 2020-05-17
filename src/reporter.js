
const fs = require('fs');
const path = require('path');
// const csv = require('csv');
const parse = require("csv-parse/lib/sync");
const stringify = require("csv-stringify/lib/sync");
// const csvWriter = require('csv-writer');
// const createCsvWriter = csvWriter.createObjectCsvWriter;

class Reporter {
    constructor(filepath) {
        this.filepath = filepath;
        this.headers = [
            {key: 'time', header: 'Time'},
            {key: 'success', header: 'Success'},
            {key: 'speed', header: 'Speed(Mbps)'}
        ];
    }

    makeFileName() {
        const now = new Date();
        return `log-${now.toISOString().split('T')[0]}.csv`;
    }

    async add(record) {
        const filepath = path.join(this.filepath, this.makeFileName());

        let records = [];
        if(fs.existsSync(filepath)) {
            let input = fs.readFileSync(filepath);
            records = parse(input, {
                header: false,
                columns: false,
                skip_empty_lines: true
            });
        }
        console.log(records.length);

        record.time = record.time.toLocaleString();
        record.success = record.success ? 'success' : 'failed';
        records.push(record);
        
        const csvData = stringify(records, { header: false, columns: this.headers});
        fs.writeFileSync(filepath, csvData);
    }
}

module.exports = Reporter;