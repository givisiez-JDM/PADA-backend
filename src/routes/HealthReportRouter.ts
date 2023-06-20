import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { healthReportController } from "./main";

const healthReportRouter = Router();

healthReportRouter.post("/health-report", authMiddleware, healthReportController.createMyHealth);
healthReportRouter.get("/health-report", authMiddleware, healthReportController.list);
healthReportRouter.get("/health-report/:id", authMiddleware, healthReportController.findById);
healthReportRouter.patch("/health-report/:id", authMiddleware, healthReportController.updateReport);
healthReportRouter.delete("/health-report/:id", authMiddleware, healthReportController.deleteReport);



export default healthReportRouter;