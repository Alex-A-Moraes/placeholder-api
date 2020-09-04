import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import cors from "cors";
import * as morgan from "morgan";
import ApiService from "./src/api.service";
import BrokerConfig from "./config/broker.config";

export default class App {
  public constructor() {
    let broker = new BrokerConfig();
    const svc = new ApiService(broker);

    const app = express();
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.options("*", cors());
    app.use(
      morgan(
        ":date[iso] :method :url :status :response-time ms - :res[content-length]"
      )
    );
    app.use("/", svc.express());

    app.route("/status").get((_req, res) => {
      res.json({
        success: true,
        serverStatus: "OK",
        port: 3001,
      });
    });

    const port = process.env.PORT || 3001;

    app.listen(port, () => {
      console.log(`Open http://localhost:${port}`);
    });

    broker.start();
  }
}
