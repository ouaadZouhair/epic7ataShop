import { BsInfoCircleFill, BsStack } from "react-icons/bs";
import { GiCottonFlower, GiSewingString } from "react-icons/gi";
import hoodieImg from '/imgWebpage/hoodie_size.png'
import tshirtImg from '/imgWebpage/tshirt-size.png'
import { useState, useEffect } from "react";

const claHoodieSizes = [
    { size: "S", width: "50 cm", height: "68 cm" },
    { size: "M", width: "52 cm", height: "70 cm" },
    { size: "L", width: "56 cm", height: "72 cm" },
    { size: "XL", width: "59 cm", height: "74 cm" },
    { size: "XXL", width: "64 cm", height: "76 cm" },
];

const claTshirtSizes = [
    { size: "S", width: "49 cm", height: "70 cm" },
    { size: "M", width: "51 cm", height: "71 cm" },
    { size: "L", width: "53 cm", height: "72 cm" },
    { size: "XL", width: "55 cm", height: "74 cm" },
    { size: "XXL", width: "57 cm", height: "78 cm" },
];

const OVHoodieSizes = [
    { size: "S", width: "50 cm", height: "68 cm" },
    { size: "M", width: "52 cm", height: "70 cm" },
    { size: "L", width: "56 cm", height: "72 cm" },
    { size: "XL", width: "59 cm", height: "74 cm" },
    { size: "XXL", width: "64 cm", height: "76 cm" },
];

const OvTshirtSizes = [
    { size: "S", width: "50 cm", height: "66 cm" },
    { size: "M", width: "52 cm", height: "68 cm" },
    { size: "L", width: "54 cm", height: "70 cm" },
    { size: "XL", width: "56 cm", height: "71 cm" },
    { size: "XXL", width: "58 cm", height: "73 cm" },
];


const InfoProduct = ({ product }) => {
    const [currentArray, setCurrentArray] = useState([]);

    useEffect(() => {
        if (product.productType === "Classic-hoodie") {
            setCurrentArray(claHoodieSizes);
        } else if (product.productType === "Classic-tshirt") {
            setCurrentArray(claTshirtSizes);
        } else if (product.productType === "Oversize-hoodie") {
            setCurrentArray(OVHoodieSizes);
        } else if (product.productType === "Oversize-tshirt") {
            setCurrentArray(OvTshirtSizes);
        } else {
            setCurrentArray([]);
        }
    }, [product.productType]);

    return (
        <section className='w-[95%] lg:w-[80%] mx-auto my-16'>
            {/* Header with modern underline effect */}
            <div className='flex items-center mb-12'>
                <BsInfoCircleFill className="text-3xl text-blue-500 mr-3" />
                <h1 className="text-3xl font-bold text-gray-800 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r from-blue-500 to-blue-300">
                    Product Details
                </h1>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Features Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <BsStack className="text-2xl text-amber-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Features</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Raglan sleeves
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Unisex design
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Regular fit
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Neck tape
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Drawstrings
                        </li>
                    </ul>
                </div>

                {/* Fabric Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <GiCottonFlower className="text-2xl text-blue-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Fabric</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            100% premium cotton
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            Fleece lining (hoodies)
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            High-temperature resistant
                        </li>
                    </ul>
                </div>

                {/* Process Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <GiSewingString className="text-2xl text-red-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Construction</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            Side-seamed construction
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            Reinforced taped neck
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            Spacious kangaroo pocket
                        </li>
                    </ul>
                </div>
            </div>

            {/* Size Guide Section */}
            {product.productType.includes('hoodie')  || product.productType.includes('tshirt') && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {product.productType.includes("Hoodie") ? "Hoodie" : "T-Shirt"} Size Guide
                    </h2>
                    <p className="text-gray-500 mt-1">Find your perfect fit with our detailed measurements</p>
                </div>

                <div className="flex flex-col lg:flex-row p-6 gap-8">
                    {/* Product Image */}
                    <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-lg p-4">
                        {(product.productType === 'Classic-hoodie' || product.productType === 'Oversize-hoodie') && (
                            <img src={hoodieImg} alt="hoodie size" className="w-[400px] h-auto" />
                        )}
                        {(product.productType === 'Classic-tshirt' || product.productType === 'Oversize-tshirt') && (
                            <img src={tshirtImg} alt="t-shirt size" className="w-[400px] h-auto" />
                        )}
                    </div>

                    {/* Size Table */}
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                    <th className="px-6 py-3 text-left font-medium">Size</th>
                                    <th className="px-6 py-3 text-left font-medium">Width</th>
                                    <th className="px-6 py-3 text-left font-medium">Height</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentArray.map((item, index) => (
                                    <tr key={item.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.size}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.width}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.height}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
        </section>
    );
};

export default InfoProduct