import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { editeProduct } from '../../redux/slice/ProductsShopSlice';
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import EditConfi from '../UI/EditConfi';

const EditProductForm = ({ productId, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const [showEditConfirm, setShowEditConfirm] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const frontFileInputRef = useRef(null);
    const backFileInputRef = useRef(null);
    const colorInputRef = useRef(null);

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'STD'];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        colors: [],
        sizes: {},
        tags: [],
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

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const product = response.data.data.product;

                // Initialize sizes object based on available sizes
                const sizesObj = {};
                availableSizes.forEach(size => {
                    sizesObj[size] = product.sizes?.includes(size) || false;
                });

                setFormData({
                    title: product.title || '',
                    description: product.description || '',
                    colors: product.colors || [],
                    tags: product.tags || [], // Add this line
                    sizes: sizesObj,
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

    const handleAddColor = (e) => {
        e.preventDefault();
        const colorValue = colorInputRef.current.value.trim();

        if (colorValue && !formData.colors.includes(colorValue)) {
            setFormData(prev => ({
                ...prev,
                colors: [...prev.colors, colorValue]
            }));
            colorInputRef.current.value = '';
        }
    };

    const handleRemoveColor = (colorToRemove) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.filter(color => color !== colorToRemove)
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddColor(e);
        }
    };

    const handleSizeChange = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: {
                ...prev.sizes,
                [size]: !prev.sizes[size]
            }
        }));
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        const tagValue = tagInput.trim();

        if (tagValue && !formData.tags?.includes(tagValue)) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagValue]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag(e);
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setFormErrors({ ...formErrors, [field]: "Only JPEG, PNG, or WebP images are allowed" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setFormErrors({ ...formErrors, [field]: "Image size should be less than 5MB" });
            return;
        }

        try {
            setUploading(true);
            setFormErrors(prev => ({ ...prev, [field]: undefined }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({
                    ...prev,
                    [field]: reader.result
                }));

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
        setShowEditConfirm(true);
    };

    const handleConfirmEdit = async () => {
        try {
            setIsSubmitting(true);

            // Validate all fields
            const errors = {};
            if (!formData.title.trim()) errors.title = "Title is required";
            if (!formData.description.trim()) errors.description = "Description is required";
            if (formData.colors.length === 0) errors.colors = "At least one color must be added";
            if (Object.keys(formData.sizes).filter(size => formData.sizes[size]).length === 0) {
                errors.sizes = "At least one size must be selected";
            }
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
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('countInStock', formData.countInStock);
            formDataToSend.append('productType', formData.productType);
            formDataToSend.append('category', formData.category);

            // Append colors and sizes
            formData.colors.forEach(color => {
                formDataToSend.append('colors', color);
            });

            const selectedSizes = Object.keys(formData.sizes).filter(size => formData.sizes[size]);
            selectedSizes.forEach(size => {
                formDataToSend.append('sizes', size);
            });
            if (formData.tags?.length > 0) {
                formData.tags.forEach(tag => {
                    formDataToSend.append('tags', tag);
                });
            }

            // Handle images
            if (formData.imageUrls.frontMockups instanceof File) {
                formDataToSend.append('frontMockups', formData.imageUrls.frontMockups);
            }
            if (formData.imageUrls.backMockups instanceof File) {
                formDataToSend.append('backMockups', formData.imageUrls.backMockups);
            }

            const response = await dispatch(editeProduct({
                id: productId,
                updatedData: formDataToSend
            })).unwrap();

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to edit product", err);
            setFormErrors({ submit: err.message || "Failed to update product" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = () => {
        setShowEditConfirm(false);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6">Loading product data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 text-red-500">{error}</div>
            </div>
        );
    }

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
                                {/* Color input and add button */}
                                <div className="flex gap-2">
                                    <input
                                        ref={colorInputRef}
                                        type="text"
                                        placeholder="Add color (e.g., black, white)"
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddColor}
                                        className="p-2 text-blue-600 rounded-lg hover:text-blue-700 hover:scale-105 duration-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        disabled={isSubmitting}
                                    >
                                        <IoMdAddCircle className="text-2xl" />
                                    </button>
                                </div>
                                {/* Color tags display */}
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.colors.map((color, index) => (
                                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-medium group hover:text-red-700 hover:bg-red-100 hover:scale-105 duration-150">
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveColor(color)}
                                                className="ml-2 text-blue-500 group-hover:text-red-700"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {formErrors.colors && <p className="text-red-500 text-sm mt-1">{formErrors.colors}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Product Tags
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add tag (e.g., summer, limited-edition)"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="p-2 text-purple-600 rounded-lg hover:text-purple-700 hover:scale-105 duration-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        disabled={isSubmitting}
                                    >
                                        <IoMdAddCircle className="text-2xl" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.tags?.map((tag, index) => (
                                        <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-base font-medium group hover:text-red-700 hover:bg-red-100 hover:scale-105 duration-150">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-purple-500 group-hover:text-red-700"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Available Sizes <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {availableSizes.map((size) => (
                                    <label
                                        key={size}
                                        className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 cursor-pointer transition-all 
                                            ${formData.sizes[size] ?
                                                'bg-blue-600 border-blue-600 text-white' :
                                                'bg-white border-gray-200 hover:border-blue-400 text-gray-700'}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={!!formData.sizes[size]}
                                            onChange={() => handleSizeChange(size)}
                                            className="hidden"
                                        />
                                        <span className="font-medium">{size}</span>
                                    </label>
                                ))}
                            </div>
                            {formErrors.sizes && <p className="text-red-500 text-sm mt-1">{formErrors.sizes}</p>}
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
                            {isSubmitting ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
            {showEditConfirm && <EditConfi onCancel={handleCancelEdit} onEdit={handleConfirmEdit} title={productId} />}
        </div>
    );
};

export default EditProductForm;