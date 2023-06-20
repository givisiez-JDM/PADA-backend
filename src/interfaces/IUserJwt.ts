import { UserRole } from "../database/entity/Person"

export default interface IUserJwt {
  id: string;
  name: string;
  role: UserRole;
}