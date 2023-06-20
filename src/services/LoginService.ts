import md5 from "md5";
import { ErrorTypes } from "../errors/catalog";
import { userSchema } from "../utils/validations";
import DoctorService from "./DoctorService";
import PatientService from "./PatientService";

export default class LoginService {
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService
  ) { }

  doctorLogin = async (email: string, password: string) => {
    userSchema({ email, password });

    const doctor = await this.doctorService.findByEmail(email);
    if (!doctor || doctor.password !== md5(password)) {
      throw new Error(ErrorTypes.UnauthorizedError);
    }
    return { id: doctor.id, name: doctor.name, role: doctor.role };
  };

  patientLogin = async (email: string, password: string) => {
    userSchema({ email, password });

    const patient = await this.patientService.findByEmail(email);
    if (!patient || patient.password !== md5(password)) {
      throw new Error(ErrorTypes.UnauthorizedError);
    }
    return { id: patient.id, name: patient.name, role: patient.role };
  };
}
