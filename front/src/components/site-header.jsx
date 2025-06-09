import { SidebarIcon, MenuIcon, XIcon, SearchIcon, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router"; // Use react-router-dom for navigation
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'; 
import { SearchForm } from "./search-form";

export function SiteHeader(
  { searchKeyword, setSearchKeyword }
) {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    Swal.fire({
      title: 'Logout Successful',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
  ];

  const authLinks = isLoggedIn
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Deteksi Kulit', path: '/upload-penyakit' },
      ]
    : [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ];

  const allLinks = [...navLinks, ...authLinks];

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `
      px-4 py-2 rounded-md transition-colors duration-200
      ${isActive
        ? 'bg-blue-600 text-white font-semibold shadow-inner'
        : 'text-white hover:bg-blue-700 hover:text-white'
      }
    `;
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-indigo-900 fixed top-0 z-50 w-full shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            className="h-9 w-9 text-white hover:bg-blue-700 " // Hide on large screens, where AppSidebar is always visible
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <SidebarIcon className="h-5 w-5" />
          </Button>

          <nav className="hidden md:flex items-center space-x-2 xl:space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className={getLinkClasses(link.path)}
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </Button>
            ))}
          </nav>
        </div>
                  <div className="hidden md:block"> 
            <SearchForm searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} className="w-full max-w-xs" />
          </div>

        <div className="flex items-center gap-4">
         
          <nav className="hidden md:flex items-center space-x-2 xl:space-x-4">
            {authLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className={getLinkClasses(link.path)}
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </Button>
            ))}
            {isLoggedIn && (
              <Button
                variant="ghost"
                className="text-white hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </nav>

          <Button
            className="h-9 w-9 text-white hover:bg-blue-700 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-blue-800 bg-opacity-95 shadow-lg pb-4 animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col items-start px-4 py-2 space-y-2">

            {allLinks.map((link) => (
              <Button
                key={`mobile-${link.path}`}
                variant="ghost"
                className={`w-full justify-start ${getLinkClasses(link.path)}`}
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </Button>
            ))}
            {isLoggedIn && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}