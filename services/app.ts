import BrokerConfig from "./config/broker.config";
import PlaceHolderService from "./src/placeholder.service";

export default class App {
  public constructor() {
    let broker = new BrokerConfig();
    new PlaceHolderService(broker);
    broker.start();
  }
}
