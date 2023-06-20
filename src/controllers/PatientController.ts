import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PatientService from "../services/PatientService";
import Jwt from "../utils/jwt";

export default class PatientController {
  constructor(private patientService: PatientService) { }

  list = async (req: Request, res: Response) => {
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

  // createPatient = async (req: Request, res: Response) => {
  //   const { name, email, password, birthDate, telephone } = req.body;
  //   const patient = await this.patientService.createPatient(
  //     name,
  //     email,
  //     password,
  //     birthDate,
  //     telephone
  //   );
  //   res.status(StatusCodes.CREATED).json(patient);
  // };
  updatePassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.params;

    const patient = await this.patientService.updatePassword(id, password);

    res.status(StatusCodes.CREATED).json(patient)
  };

  updatePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, photo, telephone, birthDate } = req.body;
    const patient = await this.patientService.updatePatient(
      id,
      name,
      email,
      password,
      photo,
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
