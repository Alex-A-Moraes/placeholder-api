import { Service, ServiceBroker } from "moleculer";
import * as ApiGateway from "moleculer-web";

class ApiService extends Service {
  public constructor(broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: "api",
      mixins: [ApiGateway],
      settings: {
        routes: [
          {
            path: "/api",

            aliases: {
              "GET /users": "users.list",
              "GET /users/:id": "users.get",
            },

            callOptions: {
              nodeID: "node-1",
            },
          },
        ],
      },
    });
  }
}

export default ApiService;
