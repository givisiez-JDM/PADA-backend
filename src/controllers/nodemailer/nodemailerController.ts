import { Request, Response } from "express";
import NodemailerService from '../../services/nodemailer/nodemailerService';

export default class NodemailerController {
  constructor(private nodemailerService: NodemailerService) {}

  sendMail = async (req: Request, res: Response) => {
    const { email, name, userId } = req.body;

    await this.nodemailerService.sendMail(email, name, userId);

    console.log('REQ BODY', req.body);

    res.status(204).end();
  };
}