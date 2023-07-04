import md5 from "md5";
import { AppDataSource } from "../database/data-source";
import { Patient } from "../database/entity/Patient";
import { ErrorTypes } from "../errors/catalog";
import { patientUpdateSchema } from "../utils/validations";

export default class PatientService {

  updatePassword = async (id: string, password: string): Promise<object> => {
    const patient = await AppDataSource.createQueryBuilder()
      .update(Patient)
      .set({ password: md5(password) })
      .where("patient.id = :id", { id })
      .execute();
    if (!patient.affected) throw new Error(ErrorTypes.PatientNotFound);
    return { status: "Password saved", id };
  }

  updatePatient = async (
    id: string,
    name: string,
    email: string,
    password: string,
    photo: string,
    telephone: string,
    birthDate: string
  ): Promise<object> => {
    patientUpdateSchema({ name, email, password, photo, telephone, birthDate });

    const patient = await AppDataSource.createQueryBuilder()
      .update(Patient)
      .set({ name, email, password: md5(password), photo, telephone, birthDate })
      .where("patient.id = :id", { id })
      .execute();
    if (!patient.affected) throw new Error(ErrorTypes.PatientNotFound);
    return { id, name, email, photo, telephone, birthDate };
  };

  deletePatient = async (id: string): Promise<object> => {
    const patient = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Patient)
      .where("patient.id = :id", { id })
      .execute();
    if (!patient.affected) throw new Error(ErrorTypes.PatientNotFound);
    return { status: "Patient deleted", id };
  };

  findById = async (id: string): Promise<Patient> => {
    const patient = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("patient.id = :id", { id })
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birthDate", "patient.doctorId"])
      .getOne();
    if (!patient) throw new Error(ErrorTypes.PatientNotFound);
    return patient;
  };

  findByName = async (name: string): Promise<Patient[]> => {
    const patients = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("LOWER(patient.name) LIKE LOWER(:name)", { name: `%${name}%` })
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birthDate", "patient.doctorId"])
      .getMany();
    if (!patients.length) throw new Error(ErrorTypes.PatientNotFound);
    return patients;
  };

  findByEmail = async (email: string): Promise<Patient> => {
    const patient = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("LOWER(patient.email) LIKE LOWER(:email)", { email })
      .getOne();
    if (!patient) throw new Error(ErrorTypes.PatientNotFound);
    return patient;
  };

  list = async (): Promise<Patient[]> => {
    const patients = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birthDate", "patient.doctorId"])
      .getMany();
    if (!patients.length) throw new Error(ErrorTypes.PatientNotFound);
    return patients;
  };
}
