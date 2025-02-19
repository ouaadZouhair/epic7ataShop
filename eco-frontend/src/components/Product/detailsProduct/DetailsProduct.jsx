import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/slice/CartShippingSlice";
import { FaCheck } from "react-icons/fa6";
import { IoIosColorPalette, IoMdResize } from "react-icons/io";
import { AlertNot } from '../../imports.jsx';

const DetailsProduct = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alertType, setAlertType] = useState('error');
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleColorSelect = (color) => setSelectedColor(color);
    const handleSizeSelect = (size) => setSelectedSize(size);

    const handleAddItemtoCard = async (product) => {
        if (!selectedColor || !selectedSize) {
            setError(true);
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(addItem({
                productId: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                productType: product.productType,
                frontMockups: product.frontMockups,
                quantity,
                color: selectedColor,
                size: selectedSize
            }));
            setAlertType('validate');
            setValidated(true);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let timer;
        if (error || validated) {
            timer = setTimeout(() => {
                setError(false);
                setValidated(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [error, validated]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [error, validated])

    return (
        <div className="w-[95%] lg:w-2/4 my-20 flex flex-col mx-auto gap-3">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-semibold">{product.title}</h1>
            <p className="text-lg md:text-lg text-gray-500 text-justify">{product.description}</p>

            {/* Color Options */}
            <div className="flex justify-start items-center w-[400px] md:w-1/3 lg:w-[600px] gap-3">
            <IoIosColorPalette className='text-4xl text-blue-600'/>
                {product.colors.map((color) => (
                    <div
                        key={color}
                        className={`relative w-10 h-10 rounded-lg cursor-pointer border-2 p-1 
                        ${selectedColor === color ? 'border-yellow-400' : 'border-gray-400'} 
                        hover:scale-110 duration-100 ${color}`}
                        onClick={() => handleColorSelect(color)}
                    >
                        {selectedColor === color && (
                            <FaCheck className="absolute w-8 h-8 text-yellow-400 text-sm top-1 right-1" />
                        )}
                    </div>
                ))}
            </div>

            {/* Size Options */}

            <div className="flex justify-start items-center md:w-2/3 w-[400px] gap-3">
                <IoMdResize className='text-4xl text-blue-600'/>
                {product.sizes.map((size) => (
                    <div
                        key={size}
                        className={`relative w-9 h-9 rounded-lg cursor-pointer border-2 
                        ${selectedSize === size ? 'border-yellow-400' : 'border-gray-400'} 
                        hover:scale-110 duration-100`}
                        onClick={() => handleSizeSelect(size)}
                    >
                        <h1 className={`flex justify-center items-center p-1 font-semibold text-lg 
                        ${selectedSize === size ? 'text-yellow-400' : 'text-gray-500'}`}>{size}</h1>
                        {selectedSize === size && (
                            <FaCheck className="absolute w-8 h-8 text-yellow-400 text-sm top-1 right-1" />
                        )}
                    </div>
                ))}
            </div>

            {/* Quantity Input */}
            <div className="flex justify-start items-center md:w-2/3 w-[400px] gap-2">
                <label htmlFor="quantity" className="text-xl font-normal">
                    Quantity:
                </label>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-10 h-10 border border-gray-400 rounded-md text-center text-lg"
                />
            </div>

            {/* Price Display */}
            <p className="text-2xl text-end">Price: <span className='font-semibold text-3xl'>{product.price} Dh</span></p>

            {/* Add to Cart Button */}
            <button
                className={`w-[90%] mx-auto h-14 text-xl text-white border-2 border-transparent font-semibold rounded-full 
                ${(!selectedColor || !selectedSize) ? 'bg-red-700 text-white cursor-not-allowed' : 
                'bg-blue-500 hover:scale-105 hover:text-white hover:shadow-lg hover:bg-blue-600 duration-150'}`}
                onClick={() => handleAddItemtoCard(product)}
                disabled={isLoading}
            >
                {isLoading ? "Adding..." : "Add to cart"}
            </button>

            {/* Error Alert */}
            {error && (
                <AlertNot 
                    alert="error"
                    message="Failed to add item to cart. Please select Color and Size."
                    onClick={() => setError(false)}
                    show={true}
                />
            )}

            {/* Success Alert */}
            {validated && (
                <AlertNot
                    alert="validate"
                    message="The product was added to cart successfully."
                    onClick={() => setValidated(false)}
                    show={true}
                />
            )}
        </div>
    );
};

export default DetailsProduct;
