import Product from "../Models/Product.js"

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send({ status: 'success', msg: "Get Products successfully", data: products });
    } catch (error) {
        res.status(500).send({ msg: 'Server Error', error: error.message });
    }
}

// Get product by ID
export const getProductById = async (req, res) =>{
    try{
        const {id} = req.params

        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).send({ status: 'error', msg: "Product ID is required" });
        }

        const product = await Product.findById(id)

        if(!product){
            return res.status(404).send({ status: 'error', msg: "Product not found" });
        }

        res.status(201).send({ status: 'success', msg: "Get Product successfully", data: product });
    }catch (error){
        res.status(500).send({ msg: 'Server Error', error: error.message });
    }
}