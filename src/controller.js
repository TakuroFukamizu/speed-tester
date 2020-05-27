import FastSpeedtest from 'fast-speedtest-api';
import EventEmitter from 'events';

export default class Controller extends EventEmitter {
    constructor(token) {
        super();
        this.limit = 5;
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
                this.emit('tested', {
                    time,
                    success,
                    speed,
                });
                isSuccess = true;
                break;
            }
        }
        if (!isSuccess) {
            this.emit('tested', {
                time,
                success: false,
                speed: null,
            });
            console.error(`retry is out of limit ${this.limit}`);
            // TODO: logging to DB
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
