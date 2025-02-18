import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Db/Connection.js';
// import Routes
import AuthRoute from './Routes/AuthRoute.js';
import productsAdminRouter from './Routes/ProductAdminRoute.js';
import productsClientRouter from './Routes/ProductClientRoute.js';
import orderRouter from './Routes/OrderRoute.js';
import userRouter from './Routes/UserRoute.js';
import wishlistRouter from './Routes/WishlistRoute.js';
// import Middleware
import { verifyToken, authorizeRoles } from './Middleware/authMiddleware.js';
import { uploadMiddleware } from './Middleware/uploadMiddleware.js';


dotenv.config(); // Load env variables

const app = express(); // Initialize express
const { PORT } = process.env || 5000;

// Middleware
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Body parser 

// Connect to Database (mongoose)
connectDB();


// Routes
app.use('/api/v1/auth', AuthRoute); // Auth Route

app.use('/api/v1/admin/products', uploadMiddleware, verifyToken, authorizeRoles('admin'), productsAdminRouter); // Admin Products Route

app.use('/api/v1/products', verifyToken, productsClientRouter) // Client Products Route

app.use('/api/v1/orders', verifyToken, authorizeRoles('client'), orderRouter) // Orders Route

app.use('/api/v1/users', verifyToken, authorizeRoles('admin'), userRouter) // Users Route

app.use('/api/v1/wishlist', wishlistRouter) // Wishlist Route



// Server Static Files (Images) => Acess to uploads file for front end
app.use('/uploads', express.static('uploads')); // Route => http://localhost:5000/uploads/imagename.jpg

// Start the server
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
