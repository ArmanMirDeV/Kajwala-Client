import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router"; 

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <div
          className="w-full h-[calc(100vh-96px)]  rounded-lg shadow-inner p-6 overflow-auto"
          
        >
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
