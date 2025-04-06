
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">Safe Home Guardian</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/" 
              className={`hover:text-accent transition-colors ${isActive('/') ? 'text-accent font-medium' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-accent transition-colors ${isActive('/about') ? 'text-accent font-medium' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/settings" 
              className={`hover:text-accent transition-colors ${isActive('/settings') ? 'text-accent font-medium' : ''}`}
            >
              Settings
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="sm" className="ml-2">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              className={`block py-2 hover:text-accent ${isActive('/') ? 'text-accent font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 hover:text-accent ${isActive('/about') ? 'text-accent font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/settings" 
              className={`block py-2 hover:text-accent ${isActive('/settings') ? 'text-accent font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
