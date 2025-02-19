import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../Models/User.js';
import dotenv from "dotenv";

dotenv.config();

const KEY_SECRET = process.env.JWT_SECRET;

// Sign Up
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()

    try {
        const { fullName, email, password, role } = req.body;
        // Check if the user already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ msg: 'Email already registered' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user
        const newUser = await User.create({ fullName, email, password: hashedPassword, role });

        await session.commitTransaction();
        session.endSession()

        res.status(201).json({ msg: 'User registered successfully', newUser });
    } catch (err) {
        await session.abortTransaction();
        session.endSession()
        res.status(500).json({ msg: 'Server Error', error: err.message });
    } finally {
        session.endSession();
    }
}

// Log In
export const logIn = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Wrong Email or Password' });

        // Compare the user's password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return res.status(400).json({ msg: 'Wrong Email or Password' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, KEY_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({ success: true, msg: 'Login successful', user :{
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        } });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}

export const logOut = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Strict",
    });
    res.json(
        {
            success: true,
            msg: 'Logged out successfully'
        }
    )
}
