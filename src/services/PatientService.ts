import md5 from "md5";
import { randomUUID } from "node:crypto";
import { AppDataSource } from "../database/data-source";
import { Patient } from "../database/entity/Patient";
import { UserRole } from "../database/entity/Person";
import { ErrorTypes } from "../errors/catalog";
import { patientUpdateSchema } from "../utils/validations";
// import { patientSchema } from "../utils/validations";

export default class PatientService {
  // createPatient = async (
  //   name: string,
  //   email: string,
  //   password: string,
  //   birthDate: string,
  //   telephone: string
  // ) => {
  //   // patientSchema({ name, email, password });

  //   const alreadyExists = await AppDataSource.getRepository(Patient)
  //     .createQueryBuilder("patient")
  //     .where("patient.email = :email", { email })
  //     .getOne();
  //   if (alreadyExists) throw new Error(ErrorTypes.ConflictError);

  //   const patient = await AppDataSource.createQueryBuilder()
  //     .insert()
  //     .into(Patient)
  //     .values({ id: randomUUID(), name, email, password: md5(password), role: UserRole.PATIENT, birthDate, telephone })
  //     .execute();

  //   const insertedPatient = await AppDataSource.getRepository(Patient)
  //     .createQueryBuilder("patient")
  //     .where("patient.id = :id", { id: patient.identifiers[0].id })
  //     .select(["patient.id", "patient.name", "patient.email"])
  //     .getOne();

  //   return insertedPatient;
  // };

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
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birth_date"])
      .getOne();
    if (!patient) throw new Error(ErrorTypes.PatientNotFound);
    return patient;
  };

  findByName = async (name: string): Promise<Patient[]> => {
    const patients = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("LOWER(patient.name) LIKE LOWER(:name)", { name: `%${name}%` })
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birth_date"])
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
      .select(["patient.id", "patient.name", "patient.email", "patient.photo", "patient.telephone", "patient.birth_date"])
      .getMany();
    if (!patients.length) throw new Error(ErrorTypes.PatientNotFound);
    return patients;
  };
}
