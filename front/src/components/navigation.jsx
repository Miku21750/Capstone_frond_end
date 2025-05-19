import React from 'react'
import { Outlet } from 'react-router'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
export const Navigation = () => {
    const navigate = useNavigate();
  return (
    <div className=' bg-linear-120 h-screen bg-lime-200'>
        <header className=' w-full  text-center'>
            <nav className='p-5'>
              <Button onClick={() => navigate('/')}>Home</Button>
              <Button onClick={() => navigate('')}>About</Button>
              <Button onClick={() => navigate('')}>Education</Button>
              <Button onClick={() => navigate('/login')}>Login</Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </nav>
        </header>
        <Outlet/>
    </div>
  )
}
