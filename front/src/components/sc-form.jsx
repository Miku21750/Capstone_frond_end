import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import ApiRequest from '@/api';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { CheckIcon, Mars, Venus } from 'lucide-react';
import DatePicker from './ui/calendar';
export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  //handle login - miku21
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we log you in.',
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      const res = await ApiRequest.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      Swal.fire({
        title: 'Login Success',
        text: 'You will be redirected to the upload page.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
      });
      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text: `${error.response?.data?.msg || 'Login failed'}`,
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 2000,
      });
    }
  };
  return (
    <div className={cn("flex flex-col sm:flex-row  gap-6 items-center justify-around h-screen bg-[url('/form-bg.svg')] bg-no-repeat bg-center bg-cover p-5 bg-fixed", className)} {...props}>
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold text-white">Masuk ke Akun Anda</h1>
        <p className="text-white">Masukkan email dan kata sandi Anda untuk mengakses akun.</p>
        <img src="/2.svg" alt="" className="w-1/2 mx-auto hidden md:block" />
      </div>
      <Card className={'p-5 shadow-2xl shadow-fuchsia-200 w-fit  '}>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className={'text-xl'} htmlFor="email">
                  Email
                </Label>
                <Input className={'p-5 md:text-xl'} id="email" type="email" placeholder="mail@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-5">
                  <Label className={'text-xl'} htmlFor="password">
                    Password
                  </Label>
                  {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Lupa kata sandi Anda?
                  </a> */}
                </div>
                <Input className={'p-5 md:text-xl'} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="underline underline-offset-4">
                Daftar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}

export function RegisterForm({ className, ...props }) {
  const [birth, setBirth] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    // const age = e.target.age.value;
    // const address = e.target.address.value;
    // const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const birth = e.target.birth.value;
    const gender = e.target.gender.value;

    try {
      // Loading Swal
      Swal.fire({
        title: 'Registering...',
        text: 'Please wait while we create your account.',
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      const res = await ApiRequest.post('/api/register', {
        name,
        gender,
        email,
        password,
      });
      Swal.fire({
        title: 'Registration Success',
        text: 'You can now log in.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
      });
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: 'Registration Failed',
        text: `${error.response?.data?.msg || 'Registration failed'}`,
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 2000,
      });
    }
  };
  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  return (
    <div className={cn("flex flex-col sm:flex-row  gap-6 items-center h-fit sm:h-screen justify-around p-5 bg-[url('/form-bg.svg')] bg-no-repeat bg-center bg-cover bg-fixed ", className)} {...props}>
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold text-white">Buat Akun Baru</h1>
        <p className="text-white">
          Isi detail pada <span className="font-bold">formulir</span> untuk membuat akun Anda.
        </p>
        <img src="/1.svg" alt="" className='hidden md:block w-1/2 mx-auto'/>
      </div>
      <Card className={'p-5 shadow-2xl shadow-fuchsia-200 w-fit  '}>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className={'text-xl'} htmlFor="email">
                  Name
                </Label>
                <Input className={'p-5 md:text-xl'} id="name" type="text" required />
              </div>
              <div className="grid gap-3">
                <Label className={'text-xl'} htmlFor="email">
                  Email
                </Label>
                <Input className={'p-5 md:text-xl'} id="email" type="email" placeholder="mail@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-5">
                  <Label className={'text-xl'} htmlFor="password">
                    Password
                  </Label>
                </div>
                <Input className={'p-5 md:text-xl'} id="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <Label className={'text-xl'} htmlFor="age">Birth</Label>
                <DatePicker value={birth} id="birth" onChange={setBirth} />
              </div>
              <div className="grid gap-3">
                <Label className={'text-xl'} htmlFor="gender">
                  Gender
                </Label>
                <div className="flex justify-around items-center gap-4">
                  <label className="flex items-center gap-2">
                    <Input onChange={handleGenderChange} type="radio" name="gender" value="male" id="gender" className="hidden"/>
                    <span className="flex flex-col items-center justify-center w-20 h-20 ring-3 ring-sky-300 rounded-5">
                      {selectedGender === 'male' ? (
                        <>
                          <p className="text-lg font-black">Male</p>
                          <Mars className="w-10 h-10 text-blue-500 transition-all" />
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-black">Male</p>
                          <Mars className="w-4 h-4 text-blue-500 transition-all" />
                        </>
                      )}
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Input onChange={handleGenderChange} type="radio" name="gender" value="female" className="hidden" />
                    <span className="flex flex-col items-center justify-center w-20 h-20 ring-2 ring-pink-300 rounded-5">
                      {selectedGender === 'female' ? (
                        <>
                          <p className="text-lg font-black">Female</p>
                          <Venus className="w-10 h-10 text-pink-500 transition-all" />
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-black">Female</p>
                          <Venus className="w-4 h-4 text-pink-500 transition-all" />
                        </>
                      )}
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Sudah punya akun?{' '}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
}
