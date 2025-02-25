import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Db/Connection.js';
// import Routes
import AuthRoute from './Routes/AuthRoute.js';
import productsRouter from './Routes/ProductsRoute.js';
import orderRouter from './Routes/OrderRoute.js';
import userRouter from './Routes/UserRoute.js';
import wishlistRouter from './Routes/WishlistRoute.js';
// import Middleware
import { verifyToken, authorizeRoles } from './Middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load env variables

const app = express(); // Initialize express
const { PORT } = process.env || 5000;

const corsOptions = {
    origin: 'http://localhost:5173', // This should match your frontend origin
    credentials: true, // Allow credentials (cookies)
};

// Middleware
app.use(cors(corsOptions)); // Cross-Origin Resource Sharing
app.use(express.json()); // Body parser 
app.use(cookieParser())

// Connect to Database (mongoose)
connectDB();


// Routes
app.use('/api/v1/auth', AuthRoute); // Auth Route

app.use('/api/v1/products', productsRouter); // Products Route


app.use('/api/v1/orders', verifyToken, authorizeRoles('client'), orderRouter) // Orders Route

app.use('/api/v1/users', verifyToken, authorizeRoles('admin'), userRouter) // Users Route

app.use('/api/v1/wishlist', wishlistRouter) // Wishlist Route




// Server Static Files (Images) => Acess to uploads file for front end
app.use('/uploads', express.static('uploads')); // Route => http://localhost:5000/uploads/imagename.jpg

// Start the server
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
