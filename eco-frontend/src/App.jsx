import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext.jsx';
import { Home, Print, Shop, About, Contact, Product, Signup, Login, Checkout, Orders, NotAllowed } from "./pages/imports.jsx"
import { DashHome, DashProducts, DashOrders, DashClients, DashAnalytics } from './pages/Admin/imports.jsx';
import { Main, Dashboard } from './components/imports.jsx';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // Check if the user is authenticated and has the required role
  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Login />;
  }

  if (user && allowedRole) {
    if (user.role !== allowedRole) {
      // Redirect to login if the user does not have the required role
      return <NotAllowed />;
    }
  }
  return children ? children : <Outlet/>;

}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        // Public Routes
          <Route element={<Main />}> {/*MainLyout */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>


        // Client Protected Routes
          <Route element={<ProtectedRoute allowedRole='client' />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/print" element={<Print />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

        // Admin Protected Routes
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/dashboard" element={<Dashboard />}> {/*Dashboard Lyout */}
              <Route index element={<DashHome />} />
              <Route path="products" element={<DashProducts />} />
              <Route path="orders" element={<DashOrders />} />
              <Route path="analytics" element={<DashAnalytics />} />
              <Route path="clients" element={<DashClients />} />
            </Route>
          </Route>

        //Auth Routes
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        // Error Routes
          <Route path="/not-allowed" element={<NotAllowed />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
