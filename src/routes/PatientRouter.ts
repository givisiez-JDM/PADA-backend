import { Router } from "express";
import { patientController } from "./main";
import authMiddleware from "../middlewares/authMiddleware";
import { uploadPictureMiddleware } from "../middlewares/uploadProfilePicture";

const patientRouter = Router();

patientRouter.get('/patient', authMiddleware, patientController.list);
patientRouter.get('/patient/search', authMiddleware, patientController.findByName);
patientRouter.get('/patient/:id', authMiddleware, patientController.findById);
patientRouter.patch('/patient/set-password/:id', patientController.updatePassword)
patientRouter.patch('/patient/:id', authMiddleware, uploadPictureMiddleware, patientController.updatePatient);
patientRouter.delete('/patient/:id', authMiddleware, patientController.deletePatient);

export default patientRouter;