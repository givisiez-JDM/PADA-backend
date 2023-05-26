import { Router } from "express";
import { patientController } from "./main";

const patientRouter = Router();

patientRouter.get('/patient', patientController.getAllPatients);
patientRouter.get('/patient/search', patientController.getPatientByName);
patientRouter.get('/patient/:id', patientController.getPatientById);
patientRouter.post('/patient', patientController.createPatient);
patientRouter.put('/patient/:id', patientController.updatePatient);
patientRouter.delete('/patient/:id', patientController.deletePatient);


export default patientRouter;