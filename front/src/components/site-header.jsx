import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Navigate, useNavigate } from "react-router"
import { useEffect, useState } from "react"
export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
        Swal.fire({
          title: 'Logout Successful',
          text: 'You have been logged out successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
    navigate("/");
  };
  return (
    <header
      className="bg-cold-1 fixed top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4 justify-between">
        <div className="space-x-4 flex items-center">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
          <Button
            variant={'ghost'}
            className="text-white text-lg"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant={'ghost'}
            className="text-white text-lg"
            onClick={() => navigate('/about')}
          >
            About
          </Button>
          <Button
            variant={'ghost'}
            className="text-white text-lg"
            onClick={() => navigate('/education')}
          >
            Education
          </Button>
        </div>

        <div className="space-x-4 justify-self-end ">
            {isLoggedIn ? (
              <>
                <Button
                  variant={'ghost'}
                  className="text-white text-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant={'ghost'}
                  className="text-white text-lg"
                  onClick={() => navigate('/upload-penyakit')}
                >
                  Deteksi Kulit
                </Button>
                <Button
                  variant={'ghost'}
                  className="text-white text-lg"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={'ghost'}
                  className="text-white text-lg"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant={'ghost'}
                  className="text-white text-lg"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              
              </>
            )}
        </div>
      </div>
    </header>
  );
}
