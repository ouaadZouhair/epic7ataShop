import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, TopNav } from './components/imports.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { Home, Print, Shop, About, Contact, Product, Signup, Login, Checkout, Dashboard, Orders } from "./pages/imports.js"
 
function MainLayout() {
  
  const location = useLocation();

  // Define paths where the navbar should be hidden
  const hideNavbarRoutes = ['/signup', '/login', '/dashboard', '/orders'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <TopNav />}

      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/print" element={<Print />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<Product/>} />
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
