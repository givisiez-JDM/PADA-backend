import { Router } from "express";
import { loginController } from "./main";

const loginRouter = Router();

loginRouter.post('/login/doctor', loginController.doctorLogin);
loginRouter.post('/login/patient', loginController.patientLogin);

export default loginRouter;