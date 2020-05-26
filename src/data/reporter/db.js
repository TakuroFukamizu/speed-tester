
import mssql from 'mssql';

export default class DbReporter {

    constructor(config, workerName) {
        this.config = config;
        this.pool= new mssql.ConnectionPool({  
            user: config.user,
            password: config.password,
            server: config.server,
            database: config.database,
            enableArithAbort: true,
            parseJSON: true
        });
        this.workerName = workerName;
        this.connect(); // not waiting
    }

    async add(record) {
        if (!this.pool.connected) await this.connect();
    
        const resutls = await this.pool.request()
            .input('time', mssql.DateTimeOffset(7), record.time)
            .input('success', mssql.Bit, record.success)
            .input('speed', mssql.Float, record.speed)
            .input('worker_name', mssql.NVarChar(50), this.workerName)
            .query('insert into test_logs (time, success, speed, worker_name) values (@time, @success, @speed, @worker_name)');
        // resutls.rowAffected[0] == 1;
        return (resutls.rowsAffected.length > 0);
    }

    async connect() {
        console.info(`connecting to db ${this.config.server}`);
        await this.pool.connect();
        console.info('connecting to db is ok');
    }
}
