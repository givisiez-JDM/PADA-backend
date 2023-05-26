import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { ErrorTypes } from "../errors/catalog";
import IUserJwt from "../interfaces/IUserJwt";

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: "HS256",
};

export default class JwtService {
  static createToken(data: IUserJwt): string {
    const token = jwt.sign({ data }, secret as string, jwtConfig as object);
    return token;
  }

  static validateToken = (token: string) => {
    try {
      const { data } = jwt.verify(token, secret as string) as jwt.JwtPayload;
      return data;
    } catch (error) {
      if (error) throw new Error(ErrorTypes.InvalidToken);
    }
  };
}
