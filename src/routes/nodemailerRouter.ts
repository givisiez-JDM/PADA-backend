import { Router } from "express";
import { mailController } from "./main";

const mailRouter = Router();

mailRouter.post('/send-mail/set-password', mailController.sendMail);

export default mailRouter;