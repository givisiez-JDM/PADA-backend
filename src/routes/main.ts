import { HealthReport } from './../database/entity/HealthReport';
import DoctorController from "../controllers/DoctorController";
import LoginController from "../controllers/LoginController";
import PatientController from "../controllers/PatientController";
import DoctorService from "../services/DoctorService";
import LoginService from "../services/LoginService";
import PatientService from "../services/PatientService";
import HealthReportController from '../controllers/HealthReportController';
import HealthReportService from '../services/HealthReportService';

const patientService = new PatientService();
const patientController = new PatientController(patientService);

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

const loginService = new LoginService(doctorService, patientService);
const loginController = new LoginController(loginService);

const healthReportService = new HealthReportService();
const healthReportController = new HealthReportController(healthReportService)

export { patientController, doctorController, loginController, healthReportController };
