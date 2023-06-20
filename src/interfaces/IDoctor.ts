import { UserRole } from "../database/entity/Person";

export default interface IDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole.DOCTOR,
  createdAt?: Date;
  updatedAt?: Date;
  about?: string;
  CRM: string;
  specialty?: string;
  photo?: string;
}