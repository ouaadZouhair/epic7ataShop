import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slice/ProductsShopSlice';
import { IoMdAddCircle, IoMdClose } from "react-icons/io";

const AddProductsForm = ({ troggleForm, onSuccess }) => {
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [colorInput, setColorInput] = useState(''); // Add this state at the top
    const [tagInput, setTagInput] = useState('');

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'STD'];

    const [newProduct, setNewProduct] = useState({
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

    const handleAddTag = (e) => {
        e.preventDefault();
        const tagValue = tagInput.trim();

        if (tagValue && !newProduct.tags?.includes(tagValue)) {
            setNewProduct(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagValue]
            }));
            setTagInput('');
        }
    };


    const handleRemoveTag = (tagToRemove) => {
        setNewProduct(prev => ({
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

    const handleAddColor = (e) => {
        e.preventDefault();
        const colorValue = colorInput.trim();

        if (colorValue && !newProduct.colors.includes(colorValue)) {
            setNewProduct(prev => ({
                ...prev,
                colors: [...prev.colors, colorValue]
            }));
            setColorInput(''); // Clear the input
        }
    };

    const handleRemoveColor = (colorToRemove) => {
        setNewProduct(prev => ({
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
        setNewProduct(prev => ({
            ...prev,
            sizes: {
                ...prev.sizes,
                [size]: !prev.sizes[size] // Toggle the size
            }
        }));
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
        try {
            e.preventDefault();
            setIsSubmitting(true);

            // Validate all fields (excluding backMockups)
            const errors = {};
            if (!newProduct.title.trim()) errors.title = "Title is required";
            if (!newProduct.description.trim()) errors.description = "Description is required";
            if (newProduct.colors.some(color => !color.trim())) errors.colors = "All colors must be specified";
            if (Object.keys(newProduct.sizes).filter(size => newProduct.sizes[size]).length === 0) {
                errors.sizes = "At least one size must be selected";
            }
            if (newProduct.price <= 0) errors.price = "Price must be greater than 0";
            if (newProduct.countInStock < 0) errors.countInStock = "Inventory count cannot be negative";
            if (!newProduct.productType) errors.productType = "Product type is required";
            if (!newProduct.category) errors.category = "Category is required";
            if (!newProduct.imageUrls.frontMockups) errors.frontMockups = "Front mockup is required";

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                setIsSubmitting(false);
                return;
            }

            // Prepare FormData according to backend expectations
            const formData = new FormData();
            formData.append('title', newProduct.title);
            formData.append('description', newProduct.description);

            // Append colors and sizes as JSON strings (matches your backend parsing)
            formData.append('colors', JSON.stringify(newProduct.colors));
            // Convert sizes object to array of selected sizes
            const selectedSizes = Object.keys(newProduct.sizes)
                .filter(size => newProduct.sizes[size]);
            formData.append('sizes', JSON.stringify(selectedSizes));
            if (newProduct.tags?.length > 0) {
                formData.append('tags', JSON.stringify(newProduct.tags));
            }
            formData.append('price', newProduct.price);
            formData.append('countInStock', newProduct.countInStock);
            formData.append('productType', newProduct.productType);
            formData.append('category', newProduct.category);

            // Append front image (required)
            formData.append('frontMockups', newProduct.imageUrls.frontMockups);

            // Append back image only if it exists (optional)
            if (newProduct.imageUrls.backMockups) {
                formData.append('backMockups', newProduct.imageUrls.backMockups);
            }

            // Dispatch the action
            const resultAction = await dispatch(addProduct(formData));

            if (addProduct.fulfilled.match(resultAction)) {
                // Reset form on success
                setNewProduct({
                    title: '',
                    description: '',
                    colors: [''],
                    sizes: {},
                    price: 0,
                    countInStock: 0,
                    productType: '',
                    category: '',
                    imageUrls: {
                        frontMockups: null,
                        backMockups: null
                    }
                });

                if (onSuccess) {
                    onSuccess();
                }
            } else {
                // Handle error
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
                        onClick={troggleForm} // Make sure this matches the prop name
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    // Removed disabled={isSubmitting} to allow closing during submission
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


                                {/* Color input and add button */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add color (e.g., black, white)"
                                        value={colorInput}
                                        onChange={(e) => setColorInput(e.target.value)}
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
                                {formErrors.colors && <p className="text-red-500 text-sm mt-1">{formErrors.colors}</p>}
                                {/* Color tags display */}
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {newProduct.colors.map((color, index) => (
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
                                    {newProduct.tags?.map((tag, index) => (
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
                    ${newProduct.sizes[size] ?
                                                'bg-blue-600 border-blue-600 text-white' :
                                                'bg-white border-gray-200 hover:border-blue-400 text-gray-700'}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={!!newProduct.sizes[size]}
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
                                // value={newProduct.price}
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
                                // value={newProduct.countInStock}
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