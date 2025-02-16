import {Router} from 'express';

import { createProduct, editeProduct, deleteProduct} from '../controllers/productAdminController.js';

const productAdminRouter = Router();

// Create a new product / route -> /api/v1/products/
productAdminRouter.post('/', createProduct);

// Create a new product / route -> /api/v1/products/id
productAdminRouter.patch('/:id', editeProduct);

// Create a new product / route -> /api/v1/products/id
productAdminRouter.delete('/:id', deleteProduct);


export default productAdminRouter;