import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Db/Connection.js';
import { createServer } from 'http'; // Add this import
import { Server } from 'socket.io'; // Add this import

// import Routes
import AuthRoute from './Routes/AuthRoute.js';
import productsRouter from './Routes/ProductsRoute.js';
import orderRouter from './Routes/OrderRoute.js';
import userRouter from './Routes/UserRoute.js';
import wishlistRouter from './Routes/WishlistRoute.js';
import cartRouter from './Routes/CartRouter.js';
import ratingRoute from './Routes/RatingRoute.js';
import analyticsRouter from './Routes/AnalyticsRouter.js';
import NotificationRouter from './Routes/NotificationRouter.js';
// import Middleware
import cookieParser from 'cookie-parser';

dotenv.config(); // Load env variables

const app = express(); // Initialize express
const { PORT } = process.env || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.set('io', io);

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

app.use('/api/v1/orders', orderRouter) // Orders Route

app.use('/api/v1/cart', cartRouter) // Cart Route

app.use('/api/v1/users', userRouter) // Users Route

app.use('/api/v1/wishlist', wishlistRouter) // Wishlist Route

app.use('/api/v1/rating', ratingRoute) // Rating Route

app.use('/api/v1/analytics', analyticsRouter) // Analytics Route

app.use('/api/v1/notification', NotificationRouter)


// Server Static Files (Images) => Acess to uploads file for front end
app.use('/uploads', express.static('uploads')); // Route => http://localhost:5000/uploads/imagename.jpg

// Start the server
httpServer.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
