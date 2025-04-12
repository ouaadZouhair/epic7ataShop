import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/CartShippingSlice";
import { addToWishlist } from "../../../redux/slice/WishlistSlice";
import { FaCheck } from "react-icons/fa6";
import { IoIosColorPalette, IoMdResize, IoIosHeart } from "react-icons/io";
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

    const handleAddItemToCard = async () => {
        if (!selectedColor || !selectedSize) {
            setError(true);
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(addToCart({
                productId: product._id,  // ✅ Ensure it's consistent with Redux state
                imageUrls: { frontMockups: product.imageUrls.frontMockups, backMockups: product.imageUrls.backMockups },
                title: product.title,
                price: product.price,
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

    const handleAddItemtoWishlist = async () => {
        try {
            dispatch(addToWishlist({
                productId: product._id,  // ✅ Ensure it's consistent with Redux state
                imageUrls: { frontMockups: product.imageUrls.frontMockups, backMockups: product.imageUrls.backMockups },
                title: product.title,
                price: product.price
            }));
        } catch (error) {
            console.log(error)
            setError(true);
        }
    }

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
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-[95%] md:w-[85%] lg:w-2/4 my-20 flex flex-col mx-auto gap-3">
            <h1 className="text-3xl text-center md:text-start md:text-5xl lg:text-4xl font-semibold">{product.title}</h1>
            <p className="text-lg md:text-2xl lg:text-lg text-gray-500 text-justify">{product.description}</p>

            {/* Color Options */}
            {product.color?.length > 0 && (
                <div className="flex justify-start items-center w-[400px] md:w-1/3 lg:w-[600px] gap-3">
                    <IoIosColorPalette className='text-4xl text-black' />

                    {product.color.map((color, i) => (
                        <div
                            key={i}
                            className={`relative w-10 h-10 rounded-lg cursor-pointer border-2 p-1 
                            ${selectedColor === color ? 'border-yellow-400' : 'border-gray-600'} 
                            hover:scale-110 duration-100 ${color === 'white' && 'bg-gray-50'} ${color === 'black' && 'bg-black'} ${color === 'blue' && 'bg-blue-900'} ${color === 'red' && 'bg-red-500'} ${color === 'orange' && 'bg-orange-500'} ${color === 'green' && 'bg-green-600'} ${color === 'purple' && 'bg-purple-500'} ${color === 'gray' && 'bg-gray-300'}`}
                            onClick={() => handleColorSelect(color)}
                        >
                            {selectedColor === color && (
                                <FaCheck className="absolute w-8 h-8 text-yellow-400 text-sm top-1 right-1" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Size Options */}
            {product.size?.length > 0 && ( // ✅ Avoid crashes if sizes are undefined
                <div className="flex justify-start items-center md:w-2/3 w-[400px] gap-3">
                    <IoMdResize className='text-4xl text-black' />
                    {product.size.map((size) => (
                        <div
                            key={size}
                            className={`relative w-10 h-10 rounded-lg cursor-pointer border-2 
                            ${selectedSize === size ? 'border-yellow-400' : 'border-gray-400'} 
                            hover:scale-110 duration-100`}
                            onClick={() => handleSizeSelect(size)}
                        >
                            <h1 className={`flex justify-center items-center p-1 font-semibold text-lg text-gray-500`}>{size}</h1>
                            {selectedSize === size && (
                                <FaCheck className="absolute w-8 h-8 text-yellow-400 text-sm top-1 right-1" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Quantity Input */}
            <div className="flex justify-start items-center md:w-2/3 w-[400px] gap-2">
                <label htmlFor="quantity" className="text-lg font-normal">
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
            <p className="text-xl text-start">Price: <span className='font-semibold text-2xl'>{product.price} Dh</span></p>

            <div className='flex justify-center items-center gap-1 mx-auto md:mx-0 w-full md:w-1/2 lg:w-[350px]'>
                {/* Add to Cart Button */}
                <button
                    className={`w-[250px] mx-auto h-14 text-xl text-white border-2 border-transparent font-semibold rounded-full 
                ${(!selectedColor || !selectedSize) ? 'bg-blue-800 text-white cursor-not-allowed' :
                            'bg-blue-500 hover:scale-105 hover:text-white hover:shadow-lg hover:bg-blue-600 duration-150'}`}
                    onClick={handleAddItemToCard} // ✅ Removed passing `product` since it's available in scope
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add to cart"}
                </button>

                <button className={`w-[50px] h-[50px] mx-auto font-semibold rounded-full flex justify-center items-center bg-red-500 hover:hover:scale-105 hover:shadow-lg duration-150`}
                    onClick={handleAddItemtoWishlist}
                >
                    <IoIosHeart className='text-white text-3xl' />
                </button>
            </div>

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
