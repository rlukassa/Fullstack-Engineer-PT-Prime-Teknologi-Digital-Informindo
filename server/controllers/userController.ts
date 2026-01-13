import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            `SELECT id, username, email, created_at
             FROM users
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user: result.rows[0] });
    } catch (error: any) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.params;
        
        const result = await pool.query(
            `SELECT id, username, email, created_at
             FROM users
             WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user: result.rows[0] });
    } catch (error: any) {
        console.error('Get user by username error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
