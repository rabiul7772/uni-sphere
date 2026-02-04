import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import departmentRouter from './routes/department.routes.js';
import subjectRouter from './routes/subject.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import classRouter from './routes/class.routes.js';
import enrollmentRouter from './routes/enrollment.routes.js';

const app = express();
const PORT = 3000;

if (!process.env.FRONTEND_URL)
  throw new Error('FRONTEND_URL is not defined in .env file');

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/departments', departmentRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/classes', classRouter);
app.use('/api/v1/enrollments', enrollmentRouter);

app.get('/', (req, res) => {
  res.send('Hello from the uni sphere backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
