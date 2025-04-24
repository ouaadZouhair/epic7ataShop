import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { editeProduct } from '../../redux/slice/ProductsShopSlice';
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const EditProductForm = ({ productId, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const frontFileInputRef = useRef(null);
    const backFileInputRef = useRef(null);

    const [formData, setFormData] = useState({
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

    const [imagePreviews, setImagePreviews] = useState({
        frontMockups: null,
        backMockups: null
    });

    const productTypes = [
        { value: 'Classic-tshirt', label: 'Classic T-Shirt' },
        { value: 'Oversize-tshirt', label: 'Oversize T-Shirt' },
        { value: 'Classic-hoodie', label: 'Classic Hoodie' },
        { value: 'Oversize-hoodie', label: 'Oversize Hoodie' },
        { value: 'Caps', label: 'Caps' },
        { value: 'Mugs', label: 'Mugs' }
    ];

    const categories = [
        { value: 'Anime', label: 'Anime' },
        { value: 'Sport', label: 'Sport' },
        { value: 'Music', label: 'Music' },
        { value: 'SuperCars', label: 'Super Cars' },
        { value: 'Movies&series', label: 'Movies & Series' }
    ];

    const dispatch = useDispatch();
    const BASE_URL = "http://localhost:3000";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BASE_URL}/api/v1/products/${productId}`);
                console.log('API Response:', response.data); // Add this line

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const product = response.data.product;
                console.log('Product Data:', product); // Add this line
                setFormData({
                    title: product.title || '',
                    description: product.description || '',
                    colors: product.colors?.length ? product.colors : [''],
                    sizes: product.sizes?.length ? product.sizes : [''],
                    price: product.price || 0,
                    countInStock: product.countInStock || 0,
                    productType: product.productType || '',
                    category: product.category || '',
                    imageUrls: {
                        frontMockups: product.imageUrls?.frontMockups || null,
                        backMockups: product.imageUrls?.backMockups || null
                    }
                });

                setImagePreviews({
                    frontMockups: product.imageUrls?.frontMockups
                        ? `${BASE_URL}${product.imageUrls.frontMockups}`
                        : null,
                    backMockups: product.imageUrls?.backMockups
                        ? `${BASE_URL}${product.imageUrls.backMockups}`
                        : null
                });
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.message || "Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleAddColor = () => {
        setFormData(prev => ({
            ...prev,
            colors: [...prev.colors, '']
        }));
    };

    const handleRemoveColor = (index) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index)
        }));
    };

    const handleColorChange = (index, value) => {
        setFormData(prev => {
            const newColors = [...prev.colors];
            newColors[index] = value;
            return { ...prev, colors: newColors };
        });
    };

    const handleAddSize = () => {
        setFormData(prev => ({
            ...prev,
            sizes: [...prev.sizes, '']
        }));
    };

    const handleRemoveSize = (index) => {
        if (formData.sizes.length > 1) {
            setFormData(prev => ({
                ...prev,
                sizes: prev.sizes.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSizeChange = (index, value) => {
        setFormData(prev => {
            const newSizes = [...prev.sizes];
            newSizes[index] = value;
            return { ...prev, sizes: newSizes };
        });
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setFormErrors({ ...formErrors, [field]: "Only JPEG, PNG, or WebP images are allowed" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setFormErrors({ ...formErrors, [field]: "Image size should be less than 5MB" });
            return;
        }

        try {
            setUploading(true);
            setFormErrors(prev => ({ ...prev, [field]: undefined }));

            // In a real app, you would upload to your server here
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result;
                setImagePreviews(prev => ({
                    ...prev,
                    [field]: previewUrl
                }));

                // For demo, we'll just store the file
                // In a real app, you would store the uploaded image URL
                setFormData(prev => ({
                    ...prev,
                    imageUrls: {
                        ...prev.imageUrls,
                        [field]: file
                    }
                }));

                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error("Error uploading image:", err);
            setFormErrors({ ...formErrors, [field]: "Failed to upload image" });
            setUploading(false);
        }
    };

    const triggerFileInput = (field) => {
        if (field === 'frontMockups') {
            frontFileInputRef.current.click();
        } else {
            backFileInputRef.current.click();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);

            // Validate all fields
            const errors = {};
            if (!formData.title.trim()) errors.title = "Title is required";
            if (!formData.description.trim()) errors.description = "Description is required";
            if (formData.colors.some(color => !color.trim())) errors.colors = "All colors must be specified";
            if (formData.sizes.some(size => !size.trim())) errors.sizes = "All sizes must be specified";
            if (formData.price <= 0) errors.price = "Price must be greater than 0";
            if (formData.countInStock < 0) errors.countInStock = "Inventory count cannot be negative";
            if (!formData.productType) errors.productType = "Product type is required";
            if (!formData.category) errors.category = "Category is required";

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                setIsSubmitting(false);
                return;
            }

            // Prepare FormData for update
            const formDataToSend = new FormData();
        
            // Append simple fields
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('countInStock', formData.countInStock);
            formDataToSend.append('productType', formData.productType);
            formDataToSend.append('category', formData.category);
    
            // Append arrays properly
            formData.colors.forEach(color => {
                formDataToSend.append('colors', color);
            });
            
            formData.sizes.forEach(size => {
                formDataToSend.append('sizes', size);
            });
    
            // Handle images
            if (formData.imageUrls.frontMockups instanceof File) {
                formDataToSend.append('images', formData.imageUrls.frontMockups);
            }
            if (formData.imageUrls.backMockups instanceof File) {
                formDataToSend.append('images', formData.imageUrls.backMockups);
            }
    
            // Debug before sending
            console.log('FormData to send:');
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }
    
            const response = await dispatch(editeProduct({
                id: productId,
                updatedData: formDataToSend
            })).unwrap();
            if (onSuccess) onSuccess(); // Trigger parent to refetch data
            onClose();
        } catch (err) {
            console.error("Failed to edit product", err);
            setFormErrors({ submit: err.message || "Failed to update product" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-6">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
                    <button
                        onClick={onClose}
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
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                                {formData.colors.map((color, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                            placeholder="Color value (e.g., black, red, blue)"
                                            className={`flex-1 px-4 py-2 border ${formErrors[`color-${index}`] ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            required
                                        />
                                        {formData.colors.length > 1 && (
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
                                {formData.sizes.map((size, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={size}
                                            onChange={(e) => handleSizeChange(index, e.target.value)}
                                            placeholder="Size (e.g., S, M, L)"
                                            className={`flex-1 px-4 py-2 border ${formErrors[`size-${index}`] ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            required
                                        />
                                        {formData.sizes.length > 1 && (
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
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
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
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
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
                                name="productType"
                                value={formData.productType}
                                onChange={handleChange}
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
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
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
                                Front Mockup Design
                            </label>
                            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${formErrors.frontMockups ? 'border-red-500' : 'border-gray-300'} rounded-xl p-6 transition-colors hover:border-blue-400`}>
                                <input
                                    type="file"
                                    ref={frontFileInputRef}
                                    onChange={(e) => handleImageUpload(e, 'frontMockups')}
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isSubmitting || uploading}
                                />
                                <div
                                    onClick={() => triggerFileInput('frontMockups')}
                                    className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full"
                                >
                                    {imagePreviews.frontMockups ? (
                                        <>
                                            <img
                                                src={imagePreviews.frontMockups}
                                                alt="Front mockup preview"
                                                className="h-32 object-contain mb-2 rounded-lg"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {uploading ? 'Uploading...' : 'Click to change'}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {uploading ? 'Uploading...' : 'Upload front design'}
                                            </span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            {formErrors.frontMockups && <p className="text-red-500 text-sm mt-1">{formErrors.frontMockups}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Back Mockup Design
                            </label>
                            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${formErrors.backMockups ? 'border-red-500' : 'border-gray-300'} rounded-xl p-6 transition-colors hover:border-blue-400`}>
                                <input
                                    type="file"
                                    ref={backFileInputRef}
                                    onChange={(e) => handleImageUpload(e, 'backMockups')}
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isSubmitting || uploading}
                                />
                                <div
                                    onClick={() => triggerFileInput('backMockups')}
                                    className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full"
                                >
                                    {imagePreviews.backMockups ? (
                                        <>
                                            <img
                                                src={imagePreviews.backMockups}
                                                alt="Back mockup preview"
                                                className="h-32 object-contain mb-2 rounded-lg"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {uploading ? 'Uploading...' : 'Click to change'}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {uploading ? 'Uploading...' : 'Upload back design'}
                                            </span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </div>
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
                            disabled={isSubmitting || uploading}
                        >
                            {isSubmitting ? 'Saving...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;