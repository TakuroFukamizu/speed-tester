const Controller = require('./controller');
const Reporter = require('./reporter');
const cron = require('node-cron');
require('dotenv').config();

const token = process.env.TOKEN;
const crontab = process.env.CRONTAB || '* * * *'; // every 1 hour;
const filepath = process.env.REPORT_DIR;

const reporter = new Reporter(filepath);
const ctrl = new Controller(token, reporter);
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
console.info('start testing');