import {Router} from 'express';

import { createProduct, editeProduct, deleteProduct, getAllProducts, getProductById, getProductsByTag} from '../controllers/productController.js';
import { authorizeRoles, verifyToken } from '../Middleware/authMiddleware.js';
import { uploadMiddleware } from '../Middleware/uploadMiddleware.js';

const productsRouter = Router();

// Get all Products / route -> /api/v1/products
productsRouter.get('/', getAllProducts)

// Get a Product by ID / route -> /api/v1/products/id
productsRouter.get('/:id', getProductById)

// Get a Product by Tag 
productsRouter.get('/tag/:tag', getProductsByTag)

// Create a new product / route -> /api/v1/products/
productsRouter.post('/',verifyToken, authorizeRoles('admin'), uploadMiddleware, createProduct);

// Edite a product / route -> /api/v1/products/id
productsRouter.patch('/:id', verifyToken, authorizeRoles('admin'), uploadMiddleware, editeProduct);

// Delete a product / route -> /api/v1/products/id
productsRouter.delete('/:id',verifyToken, authorizeRoles('admin'), deleteProduct);


export default productsRouter;