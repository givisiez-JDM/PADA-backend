import { UserRole } from "../database/entity/Person";

export default interface IPatient {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole.PATIENT;
  createdAt?: Date;
  updatedAt?: Date;
  photo?: string;
  telephone?: string;
  birthDate: Date;
  doctorId: string;
}
