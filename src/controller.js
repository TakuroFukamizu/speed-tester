const FastSpeedtest = require("fast-speedtest-api");

class Controller {
    constructor(token, reporter) {
        this.limit = 5;
        this.reporter = reporter;
        this.speedtest = new FastSpeedtest({
            token: token, // required
            verbose: false, // default: false
            timeout: 10000, // default: 5000
            https: true, // default: true
            urlCount: 5, // default: 5
            bufferSize: 8, // default: 8
            unit: FastSpeedtest.UNITS.Mbps // default: Bps
        });
    }

    async run() {
        const time = new Date();
        let isSuccess = false;
        for(let i=0; i<this.limit; i++) {
            const {success, speed} = await this.doTest(time);
            if (success) {
                await this.reporter.add({
                    time,
                    success,
                    speed,
                });
                isSuccess = true;
                break;
            }
        }
        if (!isSuccess) {
            throw new Error(`retry is out of limit ${this.limit}`);
        }
    }

    async doTest(time) {
        let success = false;
        let speed = 0;
        try {
            speed = await this.speedtest.getSpeed();
            console.info(`${time.toLocaleString()}: Speed: ${speed} Mbps`);
            success = true;
        } catch(ex) {
            console.error(`${time.toLocaleString()}: Failed`, ex.message);
            
        }
        return { success, speed };
    }
}

module.exports = Controller;
