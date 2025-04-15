import { Outlet } from "react-router-dom";
import { TopNav, Navbar, Footer } from "../imports.jsx";

const Main = () => {
  return (
      <div className="flex flex-col min-h-screen">
        {/* Top navbar */}
        <TopNav />
        
        {/* Main navbar */}
        <Navbar />
        
        {/* Main content - will render child routes */}
        <main className="flex-grow">
          <Outlet />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    );
}

export default Main