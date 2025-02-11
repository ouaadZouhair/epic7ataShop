import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../Models/User.js';

const SECRET_KEY = 'EPIC7ATA';

// Sign Up
export const signUp = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Check if the user already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ msg: 'Email already registered' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user
        const newUser = await User.create({ fullName, email, password: hashedPassword, role });

        res.status(201).json({ msg: 'User registered successfully', newUser });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
}

// Log In
export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Wrong Email or Password' });

        // Compare the user's password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return res.status(400).json({ msg: 'Wrong Email or Password' });

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ msg: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}
