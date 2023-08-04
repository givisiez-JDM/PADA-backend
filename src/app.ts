import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import errorHandler from "./middlewares/error";
import doctorRouter from "./routes/DoctorRouter";
import loginRouter from "./routes/LoginRouter";
import patientRouter from "./routes/PatientRouter";
import healthReportRouter from "./routes/HealthReportRouter";
import mailRouter from "./routes/nodemailerRouter";
import routesHandler from "./middlewares/routesHandler";
import treatmentRouter from "./routes/TreatmentRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(loginRouter);
app.use(patientRouter);
app.use(doctorRouter);
app.use(healthReportRouter);
app.use(treatmentRouter);

app.use(mailRouter);

app.use(errorHandler);
app.use(routesHandler);

export default app;
