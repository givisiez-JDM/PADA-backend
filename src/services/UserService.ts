import * as md5 from "md5";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entity/User";
import { ErrorTypes } from "../errors/catalog";
import { userSchema } from "../utils/validations";

export default class UserService {
  createUser = async (email: string, password: string) => {
    userSchema({ email, password });

    const alreadyExists = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
    if (alreadyExists) throw new Error(ErrorTypes.ConflictError);

    const user = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values({ email, password: md5(password) })
      .execute();
    return user;
  };

  login = async (email: string, password: string) => {
    userSchema({ email, password });

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
    if (!user || md5(password) !== user.password)
      throw new Error(ErrorTypes.UnauthorizedError);
  };
}
