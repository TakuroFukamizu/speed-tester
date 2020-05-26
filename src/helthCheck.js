import express from 'express';
import cors from 'cors';

export default class HealthCheck {

    constructor(port) {
        this.port = port;
        const app = express();
        app.use(cors());
        app.use(this.router());
        this.app = app;
        this.lastStatus = {
            time: new Date(),
            success: true,
            speed: null,
        };
    }

    router() {
        const router = express.Router();
        router.get('/api/helth', async (req, res) => {
            if (this.lastStatus.success) {
                return res.sendStatus(200);
            } else {
                return res.sendStatus(500);
            }
        });
        router.get('/api/last', async (req, res) => {
            if (!this.lastStatus.success) {
                return res.sendStatus(500);
            }
            return res.json({
                time: this.lastStatus.time.toLocaleString(),
                speed: this.lastStatus.speed,
            });
        });
        return router;
    }

    run() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.info(`start listen port ${this.port} for helath-check api`);
        })
    }

    setLastStatus(time, success, speed) {
        this.lastStatus.time = time;
        this.lastStatus.success = success;
        this.lastStatus.speed = speed;
    }

}