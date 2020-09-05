import * as fs from "fs";
import * as path from "path";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import UsersRoute from "./api/users.route";
import DateBase from "./config/db.config";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

class App {
  public app: express.Application;
  private database: DateBase;

  public constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(
      morgan("common", {
        stream: fs.createWriteStream(path.join(__dirname, "../log.txt"), {
          flags: "a",
        }),
      })
    );

    this.app.use("/api", UsersRoute);

    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
