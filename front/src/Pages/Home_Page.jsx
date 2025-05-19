import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router'
export const HomePage = () => {
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
        <div className="flex flex-col items-center justify-center h-[calc(100vh-77px)]">
          <h1 className='text-8xl '>Luminou§kin</h1>  
          <p>Selamat Datang di website Lumiou§kin!</p>
          <p className=''>Kami Memberikan informasi seputar penyakit kulit dan juga fitur deteksi kulit yang bisa anda gunakan untuk mengecek penyakit yang di derita dan pengobatannya</p>
          <p></p>
        </div>
    </div>
  )
}
