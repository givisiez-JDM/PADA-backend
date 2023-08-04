import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { treatmentController } from "./main";

const treatmentRouter = Router();

treatmentRouter.get("/treatment/:treatmentId/list-phases", authMiddleware, treatmentController.listPhasesByTreatmentId);
treatmentRouter.get("/treatment/phase/:phaseId", authMiddleware, treatmentController.findPhaseById);
treatmentRouter.put("/treatment/phase-update/:phaseId", authMiddleware, treatmentController.updatePhase);
treatmentRouter.delete("/treatment/phase-delete/:phaseId", authMiddleware, treatmentController.deletePhase);
treatmentRouter.post("/treatment/:treatmentId/phase-register", authMiddleware, treatmentController.phaseRegistration);

export default treatmentRouter;
