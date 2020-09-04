import { ServiceBroker } from "moleculer";
class BrokerConfig extends ServiceBroker {
  public constructor() {
    super({
      nodeID: "node-1",
      transporter: "redis://redis",
      metrics: true,
    });
  }
}
export default BrokerConfig;
