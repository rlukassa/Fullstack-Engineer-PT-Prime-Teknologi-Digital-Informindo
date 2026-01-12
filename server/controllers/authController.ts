import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const __login__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: `1d` }
        );
        res.status(200).json({ token, userId: user._id });
        console.log(`Successful login for user: ${user.username}`);
    }
    catch (err: any) {
        res.status(500).json({ message: `Login | ${err.message}` });
    }
};

export const __register__ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const existingUserEmail = await User.findOne({ email });
        const existingUserName = await User.findOne({ username });
        if (existingUserEmail || existingUserName) {
            res.status(400).json({ message: `User already exists!` });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: `1d` }
        );

        res.status(201).json({
            token,
            userId: newUser._id,
            message: `User registered successfully!`
        });
        console.log(`New user registered: ${newUser.username}`);
    }
    catch (err: any) {
        res.status(500).json({ message: `Register | ${err.message}` });
    }
};
