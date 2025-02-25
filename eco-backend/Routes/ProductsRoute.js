import {Router} from 'express';

import { createProduct, editeProduct, deleteProduct, getAllProducts, getProductById} from '../controllers/productController.js';
import { authorizeRoles, verifyToken } from '../Middleware/authMiddleware.js';
import { uploadMiddleware } from '../Middleware/uploadMiddleware.js';

const productsRouter = Router();

// Get all Products / route -> /api/v1/products
productsRouter.get('/', getAllProducts)

// Get a Product by ID / route -> /api/v1/products/id
productsRouter.get('/:id', getProductById)

// Create a new product / route -> /api/v1/products/
productsRouter.post('/',verifyToken, authorizeRoles('admin'),uploadMiddleware, createProduct);

// Create a new product / route -> /api/v1/products/id
productsRouter.patch('/:id',verifyToken, authorizeRoles('admin'), editeProduct);

// Create a new product / route -> /api/v1/products/id
productsRouter.delete('/:id',verifyToken, authorizeRoles('admin'), deleteProduct);


export default productsRouter;