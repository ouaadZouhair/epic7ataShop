import { useState, useEffect } from 'react';
import { FaArrowUp, FaFacebook, FaCcVisa, FaCcPaypal } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { SiMastercard } from "react-icons/si";
import logo from '../../assets/epic7ata-logo-white.png';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset === 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative flex flex-col gap-2 items-center bg-black/95 text-white w-full h-auto -bottom-10">
            {/* Back to Top Button */}
            {/* {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Back to top"
                >
                    <FaArrowUp className="text-white text-xl" />
                </button>
            )} */}

            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <img src={logo} alt="Epic7ata Logo" className="w-14 h-14 rounded-lg" />
                            <span className="text-xl font-bold">Epic7ata</span>
                        </div>
                        <div className="space-y-3">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                07, Rue Resistence Ocean Rabat Maroc
                            </p>
                            <p className="text-gray-300 font-medium">epic7ata@gmail.com</p>
                            <p className="text-gray-300 font-bold">+212 716 486 381</p>
                        </div>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-400 hover:text-blue-800 transition-colors duration-200">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                                <FiInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-200">
                                <IoLogoWhatsapp className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <IoLogoTiktok className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Website Pages */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
                            Website Pages
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Print
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Shop
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Help & Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
                            Help & Information
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
                            Terms & Conditions
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Products Returns
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 Created by{' '}
                        <a 
                            href="https://zouhairod.netlify.app/" 
                            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                        >
                            Zouhair Ouaad
                        </a>. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <FaCcVisa className="text-2xl text-gray-400 hover:text-white transition-colors duration-200" />
                        <SiMastercard className="text-2xl text-gray-400 hover:text-white transition-colors duration-200" />
                        <FaCcPaypal className="text-2xl text-gray-400 hover:text-white transition-colors duration-200" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;