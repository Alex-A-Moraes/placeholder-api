import client from "../util/client";
import UsersRepository from "../repository/users.repository";
import UsersBusiness from "../business/users.business";
import { Request, Response } from "express";
import * as httpStatus from "http-status";
import LogSystem from "../log/LogSystem";
import * as util from "../util/index";

class UsersController {
  async getAll(_req: Request, res: Response) {
    try {
      const result = await client.get(`${process.env.URL_PLACEHOLDER}/users`);
      util.sendResponse(res, httpStatus.OK, result);
    } catch (error) {
      LogSystem.Error(error);
      util.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {
        msgError: "Serviço temporariamente indisponível!",
      });
    }
  }

  async insertAll(req: Request, res: Response) {
        try {
            const repository = new UsersRepository();

            const usersbs = new UsersBusiness(req.body);
            usersbs.filterSuite();

            const promisse = usersbs.get().map(async (user: object) => {
                return repository.insertData(
                    usersbs.getPersonal(user),
                    usersbs.getAddress(user),
                    usersbs.getContact(user),
                );
            });

            const r = await Promise.all(promisse);

            util.sendResponse(res, httpStatus.OK, r);
        } catch (error) {            
            LogSystem.Error(error);
            util.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {
                msgError: 'Serviço temporariamente indisponível!',
            });
        }
    }
}

export default new UsersController();
