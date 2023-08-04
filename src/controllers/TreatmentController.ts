import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TreatmentService from "../services/TreatmentService";

export default class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}

  phaseRegistration = async (req: Request, res: Response) => {
    const { treatmentId } = req.params;
    const { dosage, phaseNumber, frequency, startTreatment, endTreatment, active } = req.body;

    const treatmentPhase = await this.treatmentService.phaseRegistration(treatmentId, phaseNumber, dosage, frequency, startTreatment, endTreatment, active);
    res.status(StatusCodes.CREATED).json(treatmentPhase);
  }

  updatePhase = async (req: Request, res: Response) => {
    const { phaseId } = req.params;
    const { dosage, phaseNumber, frequency, startTreatment, endTreatment, active } = req.body;

    const phase = await this.treatmentService.updatePhase(phaseId, dosage, phaseNumber, frequency, startTreatment, endTreatment, active);
    res.status(StatusCodes.OK).json(phase);
  };

  listPhasesByTreatmentId = async (req: Request, res: Response) => {
    const { treatmentId } = req.params;
   
    const phases = await this.treatmentService.listPhasesByTreatmentId(treatmentId);
    res.status(StatusCodes.OK).json(phases);
  }

  findPhaseById = async (req: Request, res: Response) => {
    const { phaseId } = req.params;
    const phase = await this.treatmentService.findPhaseById(phaseId);
    res.status(StatusCodes.OK).json(phase);
  };

  deletePhase = async (req: Request, res: Response) => {
    const { phaseId } = req.params;
    const phase = await this.treatmentService.deletePhase(phaseId);
    res.status(StatusCodes.GONE).json(phase);
  };

}
