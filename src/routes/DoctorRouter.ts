import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { doctorController } from "./main";

const doctorRouter = Router();

doctorRouter.post("/doctor", doctorController.createDoctor);

doctorRouter.get("/doctor/list-patients", authMiddleware, doctorController.listPatientsByDoctorId);
doctorRouter.get("/doctor/search", authMiddleware, doctorController.findByName);
doctorRouter.get("/doctor", authMiddleware, doctorController.list);
doctorRouter.get("/doctor/:id", authMiddleware, doctorController.findById);
doctorRouter.put("/doctor/:id", authMiddleware, doctorController.updateDoctor);
doctorRouter.delete("/doctor/:id", authMiddleware, doctorController.deleteDoctor);
doctorRouter.post("/doctor/patient-register", authMiddleware, doctorController.patientRegistration);

export default doctorRouter;
