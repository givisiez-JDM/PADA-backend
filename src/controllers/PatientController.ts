import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PatientService from "../services/PatientService";

export default class PatientController {
  constructor(private patientService: PatientService) {}

  getAllPatients = async (req: Request, res: Response) => {
    const patients = await this.patientService.getAllPatients();
    res.status(StatusCodes.OK).json(patients);
  };

  getPatientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await this.patientService.getPatientById(id);
    res.status(StatusCodes.OK).json(patient);
  };

  getPatientByName = async (req: Request, res: Response) => {
    const { q } = req.query;
    const patient = await this.patientService.getPatientByName(String(q));
    res.status(StatusCodes.OK).json(patient);
  };

  createPatient = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const patient = await this.patientService.createPatient(
      name,
      email,
      password,
      role
    );
    res.status(StatusCodes.CREATED).json(patient);
  };

  updatePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const patient = await this.patientService.updatePatient(
      id,
      name,
      email,
      password
    );
    res.status(StatusCodes.OK).json(patient);
  };

  deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await this.patientService.deletePatient(id);
    res.status(StatusCodes.OK).json(patient);
  };
}
