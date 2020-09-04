import { ServiceBroker } from "moleculer";
class BrokerConfig extends ServiceBroker {
  public constructor() {
    super({
      nodeID: process.env.NAMESPACE || "",
      transporter: "redis://redis",
      metrics: true,
      serializer: "JSON",
    });
  }
}
export default BrokerConfig;
