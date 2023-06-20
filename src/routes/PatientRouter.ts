import { Router } from "express";
import { patientController } from "./main";
import authMiddleware from "../middlewares/authMiddleware";

const patientRouter = Router();

// patientRouter.post('/patient', patientController.createPatient);
patientRouter.get('/patient', authMiddleware, patientController.list);
patientRouter.get('/patient/search', authMiddleware, patientController.findByName);
patientRouter.get('/patient/:id', authMiddleware, patientController.findById);
patientRouter.patch('/patient/set-password/:id', patientController.updatePassword)
patientRouter.patch('/patient/:id', authMiddleware, patientController.updatePatient);
patientRouter.delete('/patient/:id', authMiddleware, patientController.deletePatient);

export default patientRouter;