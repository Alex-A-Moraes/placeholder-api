import client from "../util/client";
import UsersRepository from "../repository/users.repository";
import UsersBusiness from "../business/users.business";
import { Request, Response } from "express";
import * as httpStatus from "http-status";
import LogSystem from "../log/LogSystem";

const sendResponse = (res: any, statusCode: any, data: any) => {
  res.status(statusCode).json(data);
};

class UsersController {
  async getAll(_req: Request, res: Response) {
    try {
      const result = await client.get(`${process.env.URL_PLACEHOLDER}/users`);
      sendResponse(res, httpStatus.OK, result);
    } catch (error) {
      LogSystem.Error(error);
      sendResponse(res, 500, {
        msgError: "Serviço temporariamente indisponível!",
      });
    }
  }

  async insertAll(req: Request, res: Response) {
    try {
      const repository = new UsersRepository();

      const usersbs = new UsersBusiness(req.body);
      usersbs.filterSuite();
      usersbs.get().forEach((user: object) => {
        repository.insertData(
          usersbs.getPersonal(user),
          usersbs.getAddress(user),
          usersbs.getContact(user)
        );
      });

      sendResponse(res, httpStatus.OK, { success: true });
    } catch (error) {
      LogSystem.Error(error);
      sendResponse(res, 500, {
        msgError: "Serviço temporariamente indisponível!",
      });
    }
  }
}

export default new UsersController();
