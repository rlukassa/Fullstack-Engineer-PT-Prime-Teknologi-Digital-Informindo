import { Request, Response } from 'express';
import { pool } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const __login__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({ message: `Username or password is incorrect!` });
            return;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Username or password is incorrect!" });
            return;
        }
        
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: `1d` }
        );
        
        res.status(200).json({ token, userId: user.id, username: user.username });
        console.log(`Successful login for user: ${user.username}`);
    }
    catch (err: any) {
        console.error('Login error:', err);
        res.status(500).json({ message: `Login | ${err.message}` });
    }
};

export const __register__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );
        
        if (existingUser.rows.length > 0) {
            res.status(400).json({ message: `User already exists!` });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            `INSERT INTO users (username, email, password, created_at) 
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
             RETURNING id, username, email`,
            [username, email, hashedPassword]
        );
        
        const newUser = result.rows[0];

        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: `1d` }
        );

        res.status(201).json({
            token,
            userId: newUser.id,
            message: `User registered successfully!`
        });
        console.log(`New user registered: ${newUser.username}`);
    }
    catch (err: any) {
        console.error('Register error:', err);
        res.status(500).json({ message: `Register | ${err.message}` });
    }
};

export const __logout__ = async (req: Request, res: Response): Promise<void> => {
    // JWT logout is handled client-side by removing token
    // This endpoint is for completeness and could be used for token blacklisting in future
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err: any) {
        console.error('Logout error:', err);
        res.status(500).json({ message: `Logout | ${err.message}` });
    }
};
