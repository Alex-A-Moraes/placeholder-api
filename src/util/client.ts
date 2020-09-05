import * as request from "request";

class Client {
  get(url) {
    return this.client("GET", url);
  }

  private client(method, url) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          method: method,
          timeout: 5000,
          strictSSL: false,
          headers: {
            Accept: "application/json",
          },
        };
        request(url, options, (error: any, response: any) => {
          if (error) {
            console.log({ error });
            return reject(error);
          }
          let { body: responseBody } = response;

          if (responseBody && typeof responseBody === "string") {
            try {
              responseBody = JSON.parse(responseBody);
            } catch {}
          }

          return resolve(responseBody);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Client();
