import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'KinetixPro API is running',
        database: 'MongoDB Atlas Connected'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Has been connected to the database successfully.`);
});