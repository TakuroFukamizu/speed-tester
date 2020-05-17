const Controller = require('./controller');
const Reporter = require('./reporter');
const cron = require('node-cron');
require('dotenv').config();

const token = process.env.TOKEN;
const filepath = process.env.REPORT_DIR;
const reporter = new Reporter(filepath);

const crontab = '* * * * *'; // every min;
// const crontab = '*/10 * * * * *'; // every 10 sec;
let task = cron.schedule(crontab, () => test(), { scheduled: false });

const ctrl = new Controller(token, reporter);

const test = async () => {
    try {
        await ctrl.run();
    } catch(ex) {
        console.error(ex.message);
        task.stop();
        process.exit(1);
    }
};

console.info('start test');
task.start();