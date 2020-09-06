import App from "../src/app";
import request from "supertest";
import UsersRepository from "../src/repository/users.repository";
import UsersBusiness from "../src/business/users.business";

describe("Baixar Dados", () => {
  it("it should all users return", async () => {
    const response = await request(App.app).get("/api/baixar-dados");
    expect(response.status).toBe(200);
  });
});

describe("Salvar Dados", () => {
  it("it should save all users", async () => {
    const users = await request(App.app).get("/api/baixar-dados");
    const response = await request(App.app)
      .post("/api/salvar-dados")
      .send(users.body);
    expect(response.status).toBe(200);
  });

  it("it should return error send users empty", async () => {
    const response = await request(App.app).post("/api/salvar-dados").send([]);
    expect(response.status).toBe(500);
  });
});

describe("Users Business", () => {
  it("it should return all users in array", async () => {
    const users = await request(App.app).get("/api/baixar-dados");
    const userbs = new UsersBusiness(users.body);
    const res = userbs.get();
    expect(res).toBeInstanceOf(Array);
  });

  it("it should return only users in suite", async () => {
    const users = await request(App.app).get("/api/baixar-dados");
    const userbs = new UsersBusiness(users.body);
    userbs.filterSuite();
    const res = !userbs
      .get()
      .filter((r) => r.address.suite.toUpperCase().indexOf("APT") > -1);

    expect(res).toBe(false);
  });
});
