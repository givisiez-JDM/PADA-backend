import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import errorHandler from './middlewares/error';
import userRouter from './routes/UserRouter';
import patientRouter from './routes/PatientRouter';
import doctorRouter from './routes/DoctorRouter';
import loginRouter from './routes/LoginRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(patientRouter);
app.use(doctorRouter);
app.use(loginRouter);

app.use(errorHandler);

export default app;