import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import catsRouter from './routes/cats.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import catRouter from './routes/cats.route.js'

import commentsRoutes from './routes/comment.route.js'
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('successfully conntected to mongoDB!'))
    .catch((err) => console.log(err));

const __direname = path.resolve();


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/jsonstore/cats', commentsRoutes);

app.listen(3000, () => console.log('app listening on port 3000'));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/cats', catsRouter);
app.use('/api/:catId', catRouter);

app.use(express.static(path.join(__direname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__direname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });

});


