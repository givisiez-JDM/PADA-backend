import DoctorController from "../controllers/DoctorController";
import LoginController from "../controllers/LoginController";
import PatientController from "../controllers/PatientController";
import DoctorService from "../services/DoctorService";
import LoginService from "../services/LoginService";
import PatientService from "../services/PatientService";
import HealthReportController from '../controllers/HealthReportController';
import HealthReportService from '../services/HealthReportService';
import TreatmentService from '../services/TreatmentService';
import TreatmentController from '../controllers/TreatmentController';
import NodemailerService from '../services/nodemailer/nodemailerService';
import nodemailerController from '../controllers/nodemailer/nodemailerController';

const patientService = new PatientService();
const patientController = new PatientController(patientService);

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

const loginService = new LoginService(doctorService, patientService);
const loginController = new LoginController(loginService);

const healthReportService = new HealthReportService();
const healthReportController = new HealthReportController(healthReportService);

const treatmentService = new TreatmentService();
const treatmentController = new TreatmentController(treatmentService);

const mailService = new NodemailerService();
const mailController = new nodemailerController(mailService);

export { patientController, doctorController, loginController, healthReportController, treatmentController, mailController };
