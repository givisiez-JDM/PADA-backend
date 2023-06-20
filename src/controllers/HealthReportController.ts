import { HealthReport } from '../database/entity/HealthReport';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Jwt from "../utils/jwt";
import HealthReportService from "../services/HealthReportService";

export default class HealthReportController {
    constructor(private healthReportService: HealthReportService) { }

    createMyHealth = async (req: Request, res: Response) => {
        const { generalHealth, date, time } = req.body
        const token = req.headers.authorization
        const tokenPayload = Jwt.validateToken(token)

        const patientId = tokenPayload.id
        const newHealthReport = await this.healthReportService.createHealthReport(
            generalHealth,
            date,
            time,
            patientId
        );
        res.status(StatusCodes.CREATED).json(newHealthReport);
    };

    findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const report = await this.healthReportService.findById(id);
        res.status(StatusCodes.OK).json(report);
    };

    updateReport = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { generalHealth, date, time } = req.body;
        const token = req.headers.authorization
        const tokenPayload = Jwt.validateToken(token)

        const patientId = tokenPayload.id

        const report = await this.healthReportService.updateReport(id, generalHealth, date, time, patientId)
        res.status(StatusCodes.OK).json(report);
    }

    list = async (_req: Request, res: Response) => {
        const reports = await this.healthReportService.list();
        res.status(StatusCodes.OK).json(reports);
    };

    deleteReport = async (req: Request, res: Response) => {
        const { id } = req.params;
        const report = await this.healthReportService.deleteReport(id);
        res.status(StatusCodes.GONE).json(report);
    };
}