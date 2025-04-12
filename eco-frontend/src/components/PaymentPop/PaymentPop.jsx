import { useState } from "react";

const PaymentPopup = ({ totalAmount, onClose, onPaymentSuccess }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Here you would integrate with CNI payment gateway
            // For now, we'll simulate a successful payment
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Call the success callback
            onPaymentSuccess();
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Credit Card Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">Total Amount:</p>
                    <p className="text-2xl font-bold text-blue-600">{totalAmount} Dh</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Cardholder Name</label>
                        <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPopup;