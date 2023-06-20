import md5 from "md5";
import { randomUUID } from "node:crypto";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entity/Doctor";
import { Patient } from "../database/entity/Patient";
import { UserRole } from "../database/entity/Person";
import { Treatment } from "../database/entity/Treatment";
import { ErrorTypes } from "../errors/catalog";
import { doctorSchema, patientRegistrationSchema } from "../utils/validations";

export default class DoctorService {
  createDoctor = async (
    name: string,
    email: string,
    password: string,
    about: string,
    CRM: string,
    specialty: string,
    photo: string
  ): Promise<Doctor> => {
    doctorSchema({ name, email, password, about, CRM, specialty, photo });

    const alreadyExists = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.email = :email", { email })
      .getOne();
    if (alreadyExists) throw new Error(ErrorTypes.ConflictError);

    const doctor = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Doctor)
      .values({
        id: randomUUID(),
        name,
        email,
        password: md5(password),
        role: UserRole.DOCTOR,
        about,
        CRM,
        specialty,
        photo,
      })
      .execute();

    const insertedDoctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.id = :id", { id: doctor.identifiers[0].id })
      .select([
        "doctor.id",
        "doctor.name",
        "doctor.email",
        "doctor.role",
        "doctor.about",
        "doctor.CRM",
        "doctor.specialty",
        "doctor.photo",
      ])
      .getOne();

    return insertedDoctor;
  };

  updateDoctor = async (
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole.DOCTOR,
    about: string,
    CRM: string,
    specialty: string,
    photo: string
  ): Promise<object> => {
    doctorSchema({ name, email, password, about, CRM, specialty, photo });

    const doctor = await AppDataSource.createQueryBuilder()
      .update(Doctor)
      .set({
        name,
        email,
        password: md5(password),
        role,
        about,
        CRM,
        specialty,
        photo,
      })
      .where("doctor.id = :id", { id })
      .execute();
    if (!doctor.affected) throw new Error(ErrorTypes.DoctorNotFound);
    return { id, name, email, role, about, CRM, specialty, photo };
  };

  deleteDoctor = async (id: string): Promise<object> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder()
      .delete()
      .where("doctor.id = :id", { id })
      .execute();
    if (!doctor.affected) throw new Error(ErrorTypes.DoctorNotFound);
    return { status: "Doctor deleted", id };
  };

  findById = async (id: string): Promise<Doctor> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("doctor.id = :id", { id })
      .select([
        "doctor.id",
        "doctor.name",
        "doctor.email",
        "doctor.about",
        "doctor.CRM",
        "doctor.specialty",
        "doctor.photo",
        // "doctor.createdAt",
        // "doctor.updatedAt",
      ])
      .getOne();
    if (!doctor) throw new Error(ErrorTypes.DoctorNotFound);
    return doctor;
  };

  findByName = async (name: string): Promise<Doctor[]> => {
    const doctors = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("LOWER(doctor.name) LIKE LOWER(:name)", { name: `%${name}%` })
      .select([
        "doctor.id",
        "doctor.name",
        "doctor.email",
        "doctor.about",
        "doctor.CRM",
        "doctor.specialty",
        "doctor.photo",
        // "doctor.createdAt",
        // "doctor.updatedAt",
      ])
      .getMany();
    if (!doctors.length) throw new Error(ErrorTypes.DoctorNotFound);
    return doctors;
  };

  findByEmail = async (email: string): Promise<Doctor> => {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .where("LOWER(doctor.email) LIKE LOWER(:email)", { email })
      .getOne();
    if (!doctor) throw new Error(ErrorTypes.DoctorNotFound);
    return doctor;
  };

  list = async (): Promise<Doctor[]> => {
    const doctors = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder("doctor")
      .select([
        "doctor.id",
        "doctor.name",
        "doctor.email",
        "doctor.about",
        "doctor.CRM",
        "doctor.specialty",
        "doctor.photo",
        // "doctor.createdAt",
        // "doctor.updatedAt",
      ])
      .getMany();
    return doctors;
  };

  patientRegistration = async (
    doctorId: string,
    name: string,
    email: string,
    birthDate: Date,
    dosage: string,
    allergies: string,
    frequency: string,
    method: string,
    startTreatment: string,
    endTreatment: string
  ) => {
    patientRegistrationSchema({
      doctorId,
      name,
      email,
      birthDate,
      dosage,
      allergies,
      frequency,
      method,
      startTreatment,
      endTreatment,
    });

    const alreadyExists = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("patient.email = :email", { email })
      .getOne();
    if (alreadyExists) throw new Error(ErrorTypes.ConflictError);

    const patient = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Patient)
      .values({
        id: randomUUID(),
        role: UserRole.PATIENT,
        name,
        email,
        birthDate,
        doctorId,
      })
      .execute();

    const insertedPatient = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("patient.id = :id", { id: patient.identifiers[0].id })
      .select("patient.id")
      .getOne();

    const patientId = insertedPatient.id;

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Treatment)
      .values({
        patientId,
        dosage,
        allergies,
        frequency,
        method,
        startTreatment,
        endTreatment,
      })
      .execute();

    return {
      patient: {
        patientId,
        name,
        email,
        birthDate,
        doctorId,
      },
      treatment: {
        dosage,
        allergies,
        frequency,
        method,
        startTreatment,
        endTreatment,
      },
    };
  };

  listPatientsByDoctorId = async (doctorId: string): Promise<Patient[]> => {
    const patients = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .where("patient.doctorId = :doctorId", { doctorId })
      .select(["patient.id", "patient.name", "patient.photo"])
      .getMany();
    return patients;
  };
}
