import * as fs from "fs";

class LogSystem {
  private static fileWrite(message: any) {
    fs.appendFile("./log.txt", `${message} \n`, function (err) {
      if (err) throw err;
    });
  }

  public static Error(msg: any) {
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }
    this.fileWrite(`Erro [${new Date().toISOString()}] ${msg}`);
  }

  public static Info(msg: any) {
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }
    this.fileWrite(`Info [${new Date().toISOString()}] ${msg}`);
  }
}

export default LogSystem;
