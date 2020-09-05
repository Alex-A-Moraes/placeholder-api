import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as morgan from "morgan";
import UsersRoute from "./api/users.route";
import DateBase from "./config/db.config";

class App {
  public app: express.Application;
  private database: DateBase;

  public constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(
      morgan(
        ":date[iso] :method :url :status :response-time ms - :res[content-length]"
      )
    );

    this.app.use("/api", UsersRoute);

    this.app.route("/service/status").get((_req, res) => {
      res.json({
        success: true,
        serverStatus: "OK",
        port: process.env.PORT || 3001,
      });
    });

    this.database = new DateBase();
    this.dataBaseConnection();
  }

  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }
}

export default new App();
