import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import LoginService from "../services/LoginService";

export default class LoginController {
  constructor(private loginService: LoginService) {}

  doctorLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const login = await this.loginService.doctorLogin(email, password);
    res.status(StatusCodes.OK).json(login);
  }

  patientLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const login = await this.loginService.patientLogin(email, password);
    res.status(StatusCodes.OK).json(login);
  }
}