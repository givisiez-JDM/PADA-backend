import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DoctorService from "../services/DoctorService";
import Jwt from "../utils/jwt";

export default class DoctorController {
  constructor(private doctorService: DoctorService) { }

  createDoctor = async (req: Request, res: Response) => {
    const { name, email, password, about, CRM, specialty } = req.body;
    const photoBuffer = req.file?.buffer;

    const base64Image = photoBuffer?.toString('base64'); // salva no DB como string, se quiser salvar como binário BLOB é só remover essa linha e mudar o type para Buffer

    const doctor = await this.doctorService.createDoctor(
      name,
      email,
      password,
      about,
      CRM,
      specialty,
      base64Image
    );
    res.status(StatusCodes.CREATED).json(doctor);
  };

  updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role, about, CRM, specialty } = req.body;
    const photoBuffer = req.file?.buffer;
    const base64Image = photoBuffer.toString('base64');

    const doctor = await this.doctorService.updateDoctor(
      id,
      name,
      email,
      password,
      role,
      about,
      CRM,
      specialty,
      base64Image
    );
    res.status(StatusCodes.OK).json(doctor);
  };

  deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctor = await this.doctorService.deleteDoctor(id);
    res.status(StatusCodes.GONE).json(doctor);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctor = await this.doctorService.findById(id);
    res.status(StatusCodes.OK).json(doctor);
  };

  findByName = async (req: Request, res: Response) => {
    const { name } = req.query;
    const doctors = await this.doctorService.findByName(String(name));
    res.status(StatusCodes.OK).json(doctors);
  };

  list = async (_req: Request, res: Response) => {
    const doctors = await this.doctorService.list();
    res.status(StatusCodes.OK).json(doctors);
  };

  patientRegistration = async (req: Request, res: Response) => {
    const { name, email, birthDate, allergies, method, active } = req.body;
    const token = req.headers.authorization;
    const tokenPayload = Jwt.validateToken(token);
    const doctorId = tokenPayload.id;

    const patient = await this.doctorService.patientRegistration(doctorId, name, email, birthDate, allergies, method, active);
    res.status(StatusCodes.CREATED).json(patient);
  }

  listPatientsByDoctorId = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const tokenPayload = Jwt.validateToken(token);
    const doctorId = tokenPayload.id;

    const patients = await this.doctorService.listPatientsByDoctorId(doctorId);
    res.status(StatusCodes.OK).json(patients);
  }
}
