import UsersController from "../controller/users.controller";
import { Router } from "express";

class UsersRoute {
  public router: Router = Router();

  constructor() {
    this.router.get("/baixar-dados", UsersController.getAll);
    this.router.post("/salvar-dados", UsersController.insertAll);
  }

  get() {
    return this.router;
  }
}

export default new UsersRoute().get();
