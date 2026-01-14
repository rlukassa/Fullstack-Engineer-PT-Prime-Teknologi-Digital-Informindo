import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();

// CORS configuration for different environments
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://curious-pasca-0bf0da.netlify.app',
            /\.ngrok-free\.dev$/,  // Allow all ngrok domains
            /\.ngrok\.io$/  // Allow ngrok.io domains too
        ];

        if (!origin || allowedOrigins.some(allowed => 
            typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
        )) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'KinetixPro API is running',
        database: 'Check console for database status'
    });
});

// Health check endpoint for Docker/Kubernetes
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`\nConnecting to PostgreSQL...\n`);
});