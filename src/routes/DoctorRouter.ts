import { Router } from "express";
import { doctorController } from "./main";

const doctorRouter = Router();

doctorRouter.get('/doctor/search', doctorController.findByName);
doctorRouter.get('/doctor', doctorController.list);
doctorRouter.get('/doctor/:id', doctorController.findById);
doctorRouter.post('/doctor', doctorController.createDoctor);
doctorRouter.put('/doctor/:id', doctorController.updateDoctor);
doctorRouter.delete('/doctor/:id', doctorController.deleteDoctor);

export default doctorRouter;