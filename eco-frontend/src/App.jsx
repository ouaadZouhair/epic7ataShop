import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, TopNav } from './components/imports.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { Home, Print, Shop, About, Contact, Product, Signup, Login, Checkout } from "./pages/imports.js"

function MainLayout() {
  const productsData = useSelector(state => state.shop.products);
  const location = useLocation();

  // Define paths where the navbar should be hidden
  const hideNavbarRoutes = ['/signup', '/login'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <TopNav />}

      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home Products={productsData} />} />
        <Route path="/print" element={<Print />} />
        <Route path="/shop" element={<Shop Products={productsData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<Product Products={productsData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
