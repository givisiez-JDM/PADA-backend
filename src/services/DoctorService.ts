import * as md5 from "md5";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entity/Doctor";
import { ErrorTypes } from "../errors/catalog";
import { doctorSchema } from '../utils/validations';
import { UserRole } from "../database/entity/Person";
import { randomUUID } from "node:crypto";

export default class DoctorService {
  createDoctor = async (name: string, email: string, password: string, role: UserRole ): Promise<Doctor> => {
    doctorSchema({ name, email, password, role });

    const alreadyExists = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.email = :email", { email })
      .getOne();
    if (alreadyExists) throw new Error(ErrorTypes.ConflictError);

    const doctor = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Doctor)
      .values({ id: randomUUID(), name, email, password: md5(password), role })
      .execute();

    const insertedDoctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.id = :id", { id: doctor.identifiers[0].id })
      .select(["doctor.id", "doctor.name", "doctor.email"])
      .getOne();

    return insertedDoctor;
  };

  updateDoctor = async (id: string, name: string, email: string, password: string, role: UserRole): Promise<Doctor | number> => {
    doctorSchema({ name, email, password, role });

    const doctor = await AppDataSource.createQueryBuilder()
      .update(Doctor)
      .set({ name, email, password, role })
      .where("doctor.id = :id", { id })
      .execute();
    if (!doctor.affected) throw new Error(ErrorTypes.EntityNotFound);
    return doctor.affected;
  }

  deleteDoctor = async (id: string): Promise<number> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder()
      .delete()
      .where("doctor.id = :id", { id })
      .execute();
    if (!doctor.affected) throw new Error(ErrorTypes.EntityNotFound);
    return doctor.affected;
  }

  findById = async (id: string): Promise<Doctor> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.id = :id", { id })
      .select(["doctor.id", "doctor.name", "doctor.email"])
      .getOne();
    if (!doctor) throw new Error(ErrorTypes.EntityNotFound);
    return doctor;
  }

  findByName = async (name: string): Promise<Doctor[]> => {
    const doctors = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("LOWER(doctor.name) LIKE LOWER(:name)", { name: `%${name}%` })
      .select(["doctor.id", "doctor.name", "doctor.email"])
      .getMany();
    if (!doctors.length) throw new Error(ErrorTypes.EntityNotFound);
    return doctors;
  }

  findByEmail = async (email: string): Promise<Doctor> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("LOWER(doctor.email) LIKE LOWER(:email)", { email })
      .getOne();
    if (!doctor) throw new Error(ErrorTypes.EntityNotFound);
    return doctor;
  }

  list = async (): Promise<Doctor[]> => {
    const doctors = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .select(["doctor.id", "doctor.name", "doctor.email"])
      .getMany();
    if (!doctors.length) throw new Error(ErrorTypes.EntityNotFound);
    return doctors;
  }
}
