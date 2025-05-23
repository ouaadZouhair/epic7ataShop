import { useState, useEffect, useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slice/CartShippingSlice";
import { resetWishlist } from "../redux/slice/WishlistSlice";
import axios from "axios";





const AuthContext = createContext();

// Custom hook authentication
export const useAuth = () => {
    return useContext(AuthContext);
}

// Authentication Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true); // Set loading to true at the start
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/auth/me",
                    { withCredentials: true }
                );

                // Make sure the response contains the expected user data
                if (response.data?.user) {
                    setUser(response.data.user);
                } else {
                    console.warn("Unexpected response format:", response.data);
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);

                // Optional: Clear any invalid cookies/tokens
                // await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []); 


    const login = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/auth/LogIn`,
                data,
                { withCredentials: true }
            );
            setUser(response.data.user);
            return true
        } catch (err) {
            throw new Error(err.response?.data?.message || "Login failed");
            return false
        }
    };

    const logout = async () => {
        try {
            // Clear Cart when logout
            dispatch(clearCart())

            // Clear Wishlist when logout
            dispatch(resetWishlist)
            await axios.get(`http://localhost:3000/api/v1/auth/LogOut`, { withCredentials: true });
            setUser(null);
        } catch (err) {
            throw new Error(err.response?.data?.message || "Logout failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
