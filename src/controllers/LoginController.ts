import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import LoginService from "../services/LoginService";
import Jwt from "../utils/jwt";

export default class LoginController {
  constructor(private loginService: LoginService) { }

  doctorLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("controller email e pass", email, password);
    const user = await this.loginService.doctorLogin(email, password);
    const token = Jwt.generateToken(user);
    res.status(StatusCodes.OK).json({ user, token });
  };

  patientLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.loginService.patientLogin(email, password);
    const token = Jwt.generateToken(user);
    res.status(StatusCodes.OK).json({ user, token });
  };
}
