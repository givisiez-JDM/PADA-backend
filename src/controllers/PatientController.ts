import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PatientService from "../services/PatientService";

export default class PatientController {
  constructor(private patientService: PatientService) {}

  list = async (_req: Request, res: Response) => {
    const patients = await this.patientService.list();
    res.status(StatusCodes.OK).json(patients);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await this.patientService.findById(id);
    res.status(StatusCodes.OK).json(patient);
  };

  findByName = async (req: Request, res: Response) => {
    const { name } = req.query;
    const patients = await this.patientService.findByName(String(name));
    res.status(StatusCodes.OK).json(patients);
  };

  updatePassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.params;

    const patient = await this.patientService.updatePassword(id, password);

    res.status(StatusCodes.OK).json(patient);
  };

  updatePatient = async (req: Request, res: Response) => {
    const { name, email, password, telephone, birthDate } = req.body;
    const { id } = req.params;
    const photoBuffer = req.file?.buffer;

    const base64Image = photoBuffer.toString("base64");

    const patient = await this.patientService.updatePatient(
      id,
      name,
      email,
      password,
      base64Image,
      telephone,
      birthDate
    );
    res.status(StatusCodes.OK).json(patient);
  };

  deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await this.patientService.deletePatient(id);
    res.status(StatusCodes.OK).json(patient);
  };
}
