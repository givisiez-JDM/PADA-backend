import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DoctorService from "../services/DoctorService";

export default class DoctorController {
  constructor(private doctorService: DoctorService) {}

  createDoctor = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const doctor = await this.doctorService.createDoctor(
      name,
      email,
      password,
      role
    );
    res.status(StatusCodes.CREATED).json(doctor);
  };

  updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const doctor = await this.doctorService.updateDoctor(
      id,
      name,
      email,
      password,
      role
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
    const { q } = req.query;
    const doctors = await this.doctorService.findByName(String(q))
    res.status(StatusCodes.OK).json(doctors);
  };

  list = async (_req: Request, res: Response) => {
    const doctors = await this.doctorService.list()
    res.status(StatusCodes.OK).json(doctors);
  };
}
