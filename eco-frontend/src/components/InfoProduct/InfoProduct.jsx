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

    const [currentArray, setCurrentArray] = useState([])

    useEffect(() => {
        if (product.type === "ClaHoodies") {
            setCurrentArray(claHoodieSizes);
        } else if (product.type === "ClaTshirts") {
            setCurrentArray(claTshirtSizes);
        } else if (product.type === "OvHoodies") {
            setCurrentArray(OVHoodieSizes);
        } else if (product.type === "OvTshirts") {
            setCurrentArray(OvTshirtSizes);
        } else {
            setCurrentArray([]);
        }
    }, [product.type]);



    return (
        <section className='w-[80%] mx-auto my-10'>
            <div className='flex gap-1 items-center '>
                <BsInfoCircleFill className="text-3xl text-blue-600" />
                <h1 className="relative text-3xl font-semibold border-b-4 border-gray-200 p-1 w-full after:content-[''] after:absolute after:h-[3px] after:rounded-full after:-bottom-1 after:left-0 after:w-1/6 after:bg-blue-600">Product Info</h1>
            </div>

            <div className="w-[90%] mx-auto flex justify-between items-start my-8">
                <div className="w-1/3">
                    <span className="flex items-center gap-3">
                        <BsStack className="text-4xl text-amber-400" />
                        <h1 className="text-2xl font-semibold">Features</h1>
                    </span>
                    <ul className="w-full text-lg font-normal ml-5 text-gray-700">
                        <li>Raglan sleeves</li>
                        <li>Unisex</li>
                        <li>Regular fit</li>
                        <li>Neck tape</li>
                        <li>Drawstrings </li>
                    </ul>
                </div>

                <div className="w-1/3">
                    <span className="flex items-center gap-3">
                        <GiCottonFlower className="text-4xl text-blue-500" />
                        <h1 className="text-2xl font-semibold">Fabric</h1>
                    </span>
                    <ul className="w-full text-lg font-normal ml-5 text-gray-700">
                        <li>100% cotton</li>
                        <li>Fleece lining</li>
                        <li>High-temperature steam pre-shrunk</li>
                        <li>220g/m²</li>
                    </ul>
                </div>

                <div className="w-1/3">
                    <span className="flex items-center gap-3">
                        <GiSewingString className="text-4xl text-red-500" />
                        <h1 className="text-2xl font-semibold">Process</h1>
                    </span>
                    <ul className="w-full text-lg font-normal ml-5 text-gray-700">
                        <li>Side-seamed construction</li>
                        <li>Taped neck</li>
                        <li>Double-stitched ribbed collar, cuffs, and hem</li>
                        <li>Front kangaroo pocket</li>
                    </ul>
                </div>

            </div>

            <div className="w-full">
                <h2 className="text-3xl font-normal text-center mb-4 text-gray-950 underline">
                    {product.type.includes("Hoodie") ? "Hoodie" : "T-Shirt"} Size Guide
                </h2>
            </div>

            <div className="w-full flex justify-evenly items-center">
                {(product.type === 'ClaHoodies' || product.type === 'OvHoodies') && <img src={hoodieImg} alt="hoodie size" className="w-1/3" />}
                {(product.type === 'ClaTshirts' || product.type === 'OvTshirts') && <img src={tshirtImg} alt="thirt size" className="w-1/3" />}
                <div className="flex justify-center mt-10">
                    <div className=" rounded-lg p-6 w-96">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-500 text-white">
                                    <th className="border border-gray-300 px-4 py-2">Size</th>
                                    <th className="border border-gray-300 px-4 py-2">Width</th>
                                    <th className="border border-gray-300 px-4 py-2">Height</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentArray.map((item) => (
                                    <tr key={item.size} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{item.size}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.width}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.height}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InfoProduct