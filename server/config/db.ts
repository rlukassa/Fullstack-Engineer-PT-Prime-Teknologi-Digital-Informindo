import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        console.log(`Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);
    }
    catch (error: any) {
        console.error('Database | Connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;   

