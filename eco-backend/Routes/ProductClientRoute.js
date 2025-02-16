import { getProductById, getProducts } from "../controllers/productClientController.js";
import { Router } from 'express';

const productsClientRouter = Router()

// Get all Products / route -> /api/v1/products
productsClientRouter.get('/', getProducts)

// Get a Product by ID / route -> /api/v1/products/id
productsClientRouter.get('/:id', getProductById)

export default productsClientRouter;