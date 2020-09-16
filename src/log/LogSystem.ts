import * as fs from 'fs';
import path from 'path';

class LogSystem {
    private static fileWrite(message: any) {
        fs.appendFile(path.join(__dirname, '../log.txt'), `${message} \n`, function (err) {
            if (err) throw err;
        });
    }

    public static Error(msg: any) {
        this.fileWrite(`Erro [${new Date().toISOString()}] ${msg}`);
    }

    public static Info(msg: any) {
        this.fileWrite(`Info [${new Date().toISOString()}] ${msg}`);
    }
}

export default LogSystem;
