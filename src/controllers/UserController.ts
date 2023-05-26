import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/UserService";

export default class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.createUser(email, password);
    res.status(StatusCodes.CREATED).json(user);
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.login(email, password);
    res.status(StatusCodes.OK).json(user);
  }
}