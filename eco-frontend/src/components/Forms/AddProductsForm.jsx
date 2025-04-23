import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slice/ProductsShopSlice';
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const AddProductsForm = ({ toggleForm }) => {
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        colors: [''],
        sizes: [''],
        price: 0,
        countInStock: 0,
        productType: '',
        category: '',
        imageUrls: {
            frontMockups: null,
            backMockups: null
        }
    });

    const productTypes = [
        { value: 'classic-tshirt', label: 'Classic T-Shirt' },
        { value: 'oversize-tshirt', label: 'Oversize T-Shirt' },
        { value: 'classic-hoodie', label: 'Classic Hoodie' },
        { value: 'oversize-hoodie', label: 'Oversize Hoodie' }
    ];

    const categories = [
        { value: 'anime', label: 'Anime' },
        { value: 'sport', label: 'Sport' },
        { value: 'music', label: 'Music' },
        { value: 'superCars', label: 'Super Cars' },
        { value: 'movies&series', label: 'Movies & Series' }
    ];

    const handleAddColor = () => {
        setNewProduct(prev => ({
            ...prev,
            colors: [...prev.colors, '']
        }));
    };

    const handleRemoveColor = (index) => {
        setNewProduct(prev => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index)
        }));
    };

    const handleColorChange = (index, value) => {
        setNewProduct(prev => {
            const newColors = [...prev.colors];
            newColors[index] = value;
            return { ...prev, colors: newColors };
        });
    };

    const handleAddSize = () => {
        setNewProduct(prev => ({
            ...prev,
            sizes: [...prev.sizes, '']
        }));
    };

    const handleRemoveSize = (index) => {
        if (newProduct.sizes.length > 1) {
            setNewProduct(prev => ({
                ...prev,
                sizes: prev.sizes.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSizeChange = (index, value) => {
        setNewProduct(prev => {
            const newSizes = [...prev.sizes];
            newSizes[index] = value;
            return { ...prev, sizes: newSizes };
        });
    };

    const handleImageChange = (type, e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                setFormErrors({ ...formErrors, [type]: "Only image files are allowed" });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setFormErrors({ ...formErrors, [type]: "File size must be less than 5MB" });
                return;
            }
            
            setNewProduct(prev => ({
                ...prev,
                imageUrls: {
                    ...prev.imageUrls,
                    [type]: file
                }
            }));
            setFormErrors(prev => ({ ...prev, [type]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Validate all fields
            const errors = {};
            if (!newProduct.title.trim()) errors.title = "Title is required";
            if (!newProduct.description.trim()) errors.description = "Description is required";
            if (newProduct.colors.some(color => !color.trim())) errors.colors = "All colors must be specified";
            if (newProduct.sizes.some(size => !size.trim())) errors.sizes = "All sizes must be specified";
            if (newProduct.price <= 0) errors.price = "Price must be greater than 0";
            if (newProduct.countInStock < 0) errors.countInStock = "Inventory count cannot be negative";
            if (!newProduct.productType) errors.productType = "Product type is required";
            if (!newProduct.category) errors.category = "Category is required";
            if (!newProduct.imageUrls.frontMockups) errors.frontMockups = "Front mockup is required";
            if (!newProduct.imageUrls.backMockups) errors.backMockups = "Back mockup is required";
            
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                setIsSubmitting(false);
                return;
            }

            // Prepare FormData
            const formData = new FormData();
            formData.append('title', newProduct.title);
            formData.append('description', newProduct.description);
            formData.append('colors', JSON.stringify(newProduct.colors));
            formData.append('sizes', JSON.stringify(newProduct.sizes));
            formData.append('price', newProduct.price);
            formData.append('countInStock', newProduct.countInStock);
            formData.append('productType', newProduct.productType);
            formData.append('category', newProduct.category);
            formData.append('frontMockups', newProduct.imageUrls.frontMockups);
            formData.append('backMockups', newProduct.imageUrls.backMockups);

            // Dispatch the action
            const resultAction = await dispatch(addProduct(formData));
            
            if (addProduct.fulfilled.match(resultAction)) {
                // Success - reset form and close
                setNewProduct({
                    title: '',
                    description: '',
                    colors: [''],
                    sizes: [''],
                    price: 0,
                    countInStock: 0,
                    productType: '',
                    category: '',
                    imageUrls: {
                        frontMockups: null,
                        backMockups: null
                    }
                });
            } else {
                // Handle error from server
                if (resultAction.payload) {
                    setFormErrors({ submit: resultAction.payload.message || "Failed to create product" });
                } else {
                    setFormErrors({ submit: resultAction.error.message || "Failed to create product" });
                }
            }
        } catch (err) {
            console.error('Failed to add product', err);
            setFormErrors({ submit: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                    <button
                        onClick={toggleForm}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={isSubmitting}
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                            className={`w-full px-4 py-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        />
                        {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            rows={4}
                            className={`w-full px-4 py-3 border ${formErrors.description ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        />
                        {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Colors */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Available Colors <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                {newProduct.colors.map((color, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                            placeholder="Color value (e.g., black, red, blue)"
                                            className={`flex-1 px-4 py-2 border ${formErrors[`color-${index}`] ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            required
                                        />
                                        {newProduct.colors.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveColor(index)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                disabled={isSubmitting}
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddColor}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <IoMdAddCircle size={18} />
                                    Add Color
                                </button>
                                {formErrors.colors && <p className="text-red-500 text-sm mt-1">{formErrors.colors}</p>}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Available Sizes <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                {newProduct.sizes.map((size, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={size}
                                            onChange={(e) => handleSizeChange(index, e.target.value)}
                                            placeholder="Size (e.g., S, M, L)"
                                            className={`flex-1 px-4 py-2 border ${formErrors[`size-${index}`] ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            required
                                        />
                                        {newProduct.sizes.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSize(index)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                disabled={isSubmitting}
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddSize}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <IoMdAddCircle size={18} />
                                    Add Size
                                </button>
                                {formErrors.sizes && <p className="text-red-500 text-sm mt-1">{formErrors.sizes}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Price & count */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Price (Dhs) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                                className={`w-full px-4 py-3 border ${formErrors.price ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                            />
                            {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Inventory Count <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={newProduct.countInStock}
                                onChange={(e) => setNewProduct({ ...newProduct, countInStock: parseInt(e.target.value) || 0 })}
                                className={`w-full px-4 py-3 border ${formErrors.countInStock ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                            />
                            {formErrors.countInStock && <p className="text-red-500 text-sm mt-1">{formErrors.countInStock}</p>}
                        </div>
                    </div>

                    {/* Product Type & Category */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Product Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={newProduct.productType}
                                onChange={(e) => setNewProduct({ ...newProduct, productType: e.target.value })}
                                className={`w-full px-4 py-3 border ${formErrors.productType ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                                disabled={isSubmitting}
                            >
                                <option value="">Select a type</option>
                                {productTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                            {formErrors.productType && <p className="text-red-500 text-sm mt-1">{formErrors.productType}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className={`w-full px-4 py-3 border ${formErrors.category ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                                disabled={isSubmitting}
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                            {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
                        </div>
                    </div>

                    {/* Mockup Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Front Mockup Design <span className="text-red-500">*</span>
                            </label>
                            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${formErrors.frontMockups ? 'border-red-500' : 'border-gray-300'} rounded-xl p-6 transition-colors hover:border-blue-400`}>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange('frontMockups', e)}
                                    accept="image/*"
                                    className="hidden"
                                    id="frontMockups"
                                    disabled={isSubmitting}
                                />
                                <label
                                    htmlFor="frontMockups"
                                    className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full"
                                >
                                    {newProduct.imageUrls.frontMockups ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(newProduct.imageUrls.frontMockups)}
                                                alt="Front mockup preview"
                                                className="h-32 object-contain mb-2 rounded-lg"
                                            />
                                            <span className="text-sm text-gray-600">Click to change</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Upload front design</span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </label>
                            </div>
                            {formErrors.frontMockups && <p className="text-red-500 text-sm mt-1">{formErrors.frontMockups}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Back Mockup Design <span className="text-red-500">*</span>
                            </label>
                            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${formErrors.backMockups ? 'border-red-500' : 'border-gray-300'} rounded-xl p-6 transition-colors hover:border-blue-400`}>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange('backMockups', e)}
                                    accept="image/*"
                                    className="hidden"
                                    id="backMockups"
                                    disabled={isSubmitting}
                                />
                                <label
                                    htmlFor="backMockups"
                                    className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full"
                                >
                                    {newProduct.imageUrls.backMockups ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(newProduct.imageUrls.backMockups)}
                                                alt="Back mockup preview"
                                                className="h-32 object-contain mb-2 rounded-lg"
                                            />
                                            <span className="text-sm text-gray-600">Click to change</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Upload back design</span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </label>
                            </div>
                            {formErrors.backMockups && <p className="text-red-500 text-sm mt-1">{formErrors.backMockups}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    {formErrors.submit && (
                        <div className="text-red-500 text-center p-2 bg-red-50 rounded-lg">
                            {formErrors.submit}
                        </div>
                    )}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductsForm;