import express from 'express';
import cors from 'cors';
import connectDB from './Db/Connection.js';
import AuthRoute from './Routes/AuthRoute.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
(async () => {
    try {
        await connectDB('zouhair');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit if DB connection fails
    }
})();



// Routes
app.use('/api/v1/auth', AuthRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
