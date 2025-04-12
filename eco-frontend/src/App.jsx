import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, TopNav } from './components/imports.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { Home, Print, Shop, About, Contact, Product, Signup, Login, Checkout, Dashboard, Orders, NotAllowed } from "./pages/imports.jsx"
import { useAuth } from './Context/AuthContext.jsx';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // Check if the user is authenticated and has the required role
  !user && <Login />;

  if (user && allowedRole) {
    if (user.role !== allowedRole) {
      // Redirect to login if the user does not have the required role
      return <NotAllowed />;
    }
  }

  return children;
}

function MainLayout() {

  const { user } = useAuth();

  const location = useLocation();

  // Define paths where the navbar should be hidden
  const hideNavbarRoutes = ['/signup', '/login', '/dashboard', '/orders', '/checkout', '/print'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <TopNav />}

      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        // Public Routes
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />

        //Auth Routes
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        // Protected Routes
        <Route path="/print" element={!user ? <Login /> : <Print />}/>
        <Route path="/checkout" element={!user ? <Login /> : <Checkout />} />
        <Route path="/dashboard" element={ <ProtectedRoute allowedRole="admin"> <Dashboard /> </ProtectedRoute> }/>
        <Route path="/orders" element={ <ProtectedRoute allowedRole="client"> <Orders /> </ProtectedRoute> }/>
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
