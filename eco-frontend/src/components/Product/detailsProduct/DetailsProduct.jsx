import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useAuth } from '../../../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { addToCart } from "../../../redux/slice/CartShippingSlice";
import { removeProduct } from '../../../redux/slice/ProductsShopSlice';
import { addToWishlist } from "../../../redux/slice/WishlistSlice";
import { DeleteConfi, EditProductForm } from "../../imports.jsx"
import { FaCheck, FaStar } from "react-icons/fa6";
import { FaTrashAlt, FaPen, FaCartPlus } from "react-icons/fa";
import { IoIosColorPalette, IoMdResize, IoIosHeart } from "react-icons/io";
import { AlertNot } from '../../imports.jsx';

const DetailsProduct = ({ product, onProductUpdated }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alertType, setAlertType] = useState('error');
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { user } = useAuth();
    const dispatch = useDispatch();

    const navigate = useNavigate()


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

 

    const handleEditProduct = (e) => {
        e.stopPropagation();
        setShowEditForm(true);
    }

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true); // Show confirmation dialog
    };

    const handleConfirmDelete = async () => {
        try {
            const removeItem = await dispatch(removeProduct(product._id)).unwrap();
            if (removeItem) {
                navigate('/shop');
            }
        } catch (err) {
            console.error("Failed to remove product", err);
        } finally {
            setShowDeleteConfirm(false); // Always hide dialog after
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false); // Just hide the dialog
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        if (onProductUpdated) {
            onProductUpdated(); // This will trigger a refetch of the product data
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
            <div className='flex flex-row-reverse justify-start items-center gap-2 w-[70px]'>
                <p className=' text-gray-400'>({product.ratingCount})</p>
                <div className='text-lg flex justify-between items-center gap-1'>
                    <FaStar className='text-2xl text-amber-400'/>
                    <p className='text-lg text-gray-900 font-medium'>{parseFloat(product.ratingAvg.toFixed(1))}</p>
                </div>
            </div>

            {/* Color Options */}
            {product.colors?.length > 0 && (
                <div className="flex justify-start items-center w-[400px] md:w-1/3 lg:w-[600px] gap-3">
                    <IoIosColorPalette className='text-4xl text-black' />

                    {product.colors.map((color, i) => (
                        <div
                            key={i}
                            className={`relative w-10 h-10 rounded-lg cursor-pointer border-2 p-1 border-gray-300
                            hover:scale-110 duration-100 ${color === 'white' && 'bg-gray-50'} ${color === 'black' && 'bg-black'} ${color === 'blue' && 'bg-blue-800'} ${color === 'red' && 'bg-red-600'} ${color === 'orange' && 'bg-orange-500'} ${color === 'yellow' && 'bg-yellow-400'} ${color === 'green' && 'bg-green-600'} ${color === 'purple' && 'bg-purple-500'} ${color === 'gray' && 'bg-gray-400'}`}
                            onClick={() => handleColorSelect(color)}
                        >
                            {(selectedColor === color) ? (color !== 'red') ? (
                                <FaCheck className="absolute w-8 h-8 text-red-600 text-sm top-1 right-1" />
                            ) : (<FaCheck className="absolute w-8 h-8 text-red-100 text-sm top-1 right-1" />)
                                : ''}
                        </div>
                    ))}
                </div>
            )}

            {/* Size Options */}
            {product.sizes?.length > 0 && (
                <div className="flex justify-start items-center md:w-2/3 w-[400px] gap-3">
                    <IoMdResize className='text-4xl text-black' />
                    {product.sizes.map((size) => (
                        <div
                            key={size}
                            className={`relative w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-400
                            hover:scale-110 duration-100`}
                            onClick={() => handleSizeSelect(size)}
                        >
                            <h1 className={`flex justify-center items-center p-1 font-semibold text-lg text-gray-500`}>{size}</h1>
                            {selectedSize === size && (
                                <FaCheck className="absolute w-8 h-8 text-red-600 text-sm top-1 right-1" />
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

            {(user && user?.role === 'admin') ? (
                <div className='flex justify-start items-center gap-3 mx-auto md:mx-0 w-full md:w-1/2 lg:w-[430px]'>
                    <button className='w-[200px] h-14 flex justify-center items-center gap-2 text-lg font-semibold text-white bg-green-500 p-3 rounded-lg hover:scale-105 hover:shadow-md hover:bg-green-600 duration-150'
                        onClick={handleEditProduct}>
                        <FaPen className="text-2xl" />
                        <span>Edit Product</span>
                    </button>
                    <button className='w-[200px] h-14 flex justify-center items-center gap-2 text-lg font-semibold text-white bg-red-500 p-3 rounded-lg hover:scale-105 hover:shadow-md hover:bg-red-600 duration-150 '
                        onClick={handleRemoveClick}>
                        <FaTrashAlt className="text-2xl" />
                        <span>Delete Product</span>
                    </button>
                </div>
            ) :
                (
                    <div className='flex justify-start items-center gap-1 mx-auto md:mx-0 w-full md:w-1/2 lg:w-[430px]'>
                        {/* Add to Cart Button */}
                        <button
                            className={`w-[200px] mx-auto h-14 text-lg text-white border-2 border-transparent font-semibold rounded-lg flex justify-center items-center gap-2 
                            ${(!selectedColor || !selectedSize) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 hover:scale-105 hover:text-white hover:shadow-lg hover:bg-blue-600 duration-150'}`}
                            onClick={handleAddItemToCard} // ✅ Removed passing `product` since it's available in scope
                            disabled={isLoading}
                        >
                            <FaCartPlus className='text-white text-3xl' />
                            <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
                        </button>

                        <button className={` w-[200px] h-14 text-lg mx-auto font-semibold rounded-lg flex justify-center items-center gap-2 text-white bg-red-500 hover:bg-red-600 hover:scale-105 hover:shadow-lg duration-150`}
                            onClick={handleAddItemtoWishlist}
                        >
                            <IoIosHeart className='text-white text-3xl' />
                            <span>Add to Wishlist</span>
                        </button>
                    </div>

                )
            }

            {showDeleteConfirm && <DeleteConfi onCancel={handleCancelDelete} onDelete={handleConfirmDelete} title={product.title} />}


            {/* Error Alert */}
            {
                error && (
                    <AlertNot
                        alert="error"
                        message="Failed to add item to cart. Please select Color and Size."
                        onClick={() => setError(false)}
                        show={true}
                    />
                )
            }

            {/* Success Alert */}
            {
                validated && (
                    <AlertNot
                        alert="validate"
                        message="The product was added to cart successfully."
                        onClick={() => setValidated(false)}
                        show={true}
                    />
                )
            }

{console.log(product._id)}
            {showEditForm && (
                <EditProductForm
                    productId={product._id}
                    onClose={handleCloseEditForm}
                    onSuccess={onProductUpdated} // Call this after successful edit
                />
            )}
        </div >
    );
};

export default DetailsProduct;
