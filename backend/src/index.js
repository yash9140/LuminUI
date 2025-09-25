import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import taskRouter from './routes/tasks.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

dotenv.config();

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/tasks', taskRouter);

app.use(notFoundHandler);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Hello! Server is running.');
});


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luminui';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });



