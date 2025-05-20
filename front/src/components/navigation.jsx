import React from 'react';
import { Outlet } from 'react-router';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <header className="absolute top-0 left-0 w-full z-50">
        <nav className="flex justify-between px-6 py-4 md:px-20 backdrop-blur-sm bg-black/30">
          <div className="space-x-4">
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

          <div className="space-x-4">
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
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};