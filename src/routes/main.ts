import DoctorController from "../controllers/DoctorController";
import LoginController from "../controllers/LoginController";
import PatientController from "../controllers/PatientController";
import UserController from "../controllers/UserController";
import DoctorService from "../services/DoctorService";
import LoginService from "../services/LoginService";
import PatientService from "../services/PatientService";
import UserService from "../services/UserService";

const userService = new UserService();
const userController = new UserController(userService);

const patientService = new PatientService();
const patientController = new PatientController(patientService);

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

const loginService = new LoginService(doctorService, patientService);
const loginController = new LoginController(loginService);

export { userController, patientController, doctorController, loginController };
