import os from 'os';
import cron from 'node-cron';
import dotenv from 'dotenv';
import Controller from './controller.js';
import CsvReporter from './data/reporter/csv.js';
import DbReporter from './data/reporter/db.js';


dotenv.config();

const token = process.env.TOKEN;
const crontab = process.env.CRONTAB || '* * * *'; // every 1 hour;
const filepath = process.env.REPORT_DIR;
const usedb = process.env.USE_DB? true : false;
const dbConfig = {
    server: process.env.DB_HOST || 'localhost\\instance',
    user: process.env.DB_USER || 'SA',
    password: process.env.DB_PASSWORD || 'Passw0rd',
    database: process.env.DB_DBNAME || 'speed-tester',
};
const workerName = process.env.WORKER_NAME || os.hostname() || 'default';

const reporter = usedb
    ? new DbReporter(dbConfig, workerName) 
    : new CsvReporter(filepath);
const ctrl = new Controller(token);
ctrl.on('tested', async ({time, success, speed}) => {
    try {
        await reporter.add({
            time,
            success,
            speed,
        });
    } catch(ex) {
        console.error(ex);
    }
});
let task = null;

const test = async () => {
    try {
        await ctrl.run();
    } catch(ex) {
        console.error(ex.message);
        task.stop();
        process.exit(1);
    }
};

// start
task = cron.schedule(crontab, () => test(), { scheduled: false });
task.start();
console.info(`start testing > token: ${token}, usedb: ${usedb}`);