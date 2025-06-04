import HorizontalScrollSection from '@/components/card-scroller';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bandage, Book, Bot, Camera, Image, LineChart, Map, Play, Text } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.5,
      ease: 'power2.out',
    });
  }, []);
  return (
    <>
      <section className="relative w-full h-screen bg-cover bg-center bg-[url('/bg_hero.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative  flex flex-col justify-center items-start h-full px-6 md:px-20 text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold max-w-xl">Luminou§kin</h1>
          <h2 className="text-4xl md:text-5xl font-bold max-w-xl">Accessible Healthcare for Every Community</h2>
          <p className="text-lg md:text-xl max-w-lg">Connecting rural areas with professional medical solutions through advanced technology and compassionate care.</p>
          <div className="flex gap-5">
            <Button href="#learn-more" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg text-white font-medium transition" onClick={() => navigate('/upload-penyakit')}>
              Diagnose
            </Button>
            <Button href="#learn-more" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition" onClick={() => navigate('/education')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <section className=" flex  h-fit items-center gap-x-10 p-10 bg-cold-4">

        <div className=" text-center mx-30">

          <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
              "Pelayanan kesehatan adalah hak - bukan hak istimewa. Kami menggunakan tekhnologi untuk memberikan diagnosis dan edukasi ke setiap desa, pulau, dan keluarga di indonesia"
            </p>
          </blockquote>
        </div>
      </section>
      <section ref={containerRef} className="h-fit xl:h-screen flex flex-col justify-center bg-cold-1 gap-10 items-center">
        <h1 className="text-5xl font-quicksand font-black">Feature Yang Disediakan</h1>
        <div className="flex-col p-10 flex gap-10 xl:flex-row">

          <Card className="feature-card border-t-10 border-sky-300 hover:shadow-2xl  flex flex-col justify-between  ">
            <CardHeader className={'flex flex-col items-center justify-center'}>
              <Bot className="h-10 w-10"></Bot>
              <CardTitle className={'text-4xl text-center font-quicksand  mx-10'}>Diagnosa Online </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Foto dan Scan kulit untuk mendeteksi tanda-tanda penyakit kulit </CardTitle>
            </CardContent>
            <CardFooter className={'flex justify-center'}>
              <Button variant="outline">Try Out</Button>
            </CardFooter>
          </Card>
          <Card className="feature-card border-t-10 border-sky-300 hover:shadow-2xl  flex flex-col justify-between ">
            <CardHeader className={'flex flex-col items-center justify-center'}>
              <Bandage className="h-10 w-10"></Bandage>
              <CardTitle className={'text-4xl text-center font-quicksand'}>Saran Pengobatan </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Cari Tahu Obat yang kamu butuhkan untuk penyembuhan </CardTitle>
            </CardContent>
            <CardFooter className={'flex justify-center'}>
              <Button variant="outline">Try Out</Button>
            </CardFooter>
          </Card>
          <Card className="feature-card border-t-10 border-sky-300 hover:shadow-2xl  flex flex-col justify-between ">
            <CardHeader className={'flex flex-col items-center justify-center'}>
              <Map className="h-10 w-10"></Map>
              <CardTitle className={'text-4xl text-center font-quicksand'}>Pelayanan Terdekat </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Cari Apotek,Clinic atau pelayanan kesehatan terdekat </CardTitle>
            </CardContent>
            <CardFooter className={'flex justify-center'}>
              <Button variant="outline">Try Out</Button>
            </CardFooter>
          </Card>
          <Card className="feature-card border-t-10 border-sky-300 hover:shadow-2xl  flex flex-col justify-between ">
            <CardHeader className={'flex flex-col items-center justify-center'}>
              <Book className="h-10 w-10"></Book>
              <CardTitle className={'text-4xl text-center font-quicksand'}>Edukasi Kesehatan </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Pelajari cara penyembuhan dan pencegahan penyakit kulit </CardTitle>
            </CardContent>
            <CardFooter className={'flex justify-center'}>
              <Button variant="outline">Try Out</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <HorizontalScrollSection />
      <section className="h-screen bg-cold-3 flex flex-col gap-5 p-4 items-center justify-center">
        <div className="flex flex-col gap-20 ">
          <h1 className="text-5xl font-quicksand font-black">User Testimoni</h1>
          <div className="flex gap-5">
            <figure className="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">

              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">“Finally, I can understand my skin problem without traveling 3 hours to the clinic.”</p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-sky-400">Ria, Nusa Tenggara Timur</div>
                  <div className="text-slate-700 dark:text-slate-500">Housewife</div>
                </figcaption>
              </div>
            </figure>
            <figure className="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">

              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">“This helps us reach more people faster and give them accurate skin care advice.”</p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-sky-400">Pak Peri, Kalimantan Barat</div>
                  <div className="text-slate-700 dark:text-slate-500">Puskesmas Staff</div>
                </figcaption>
              </div>
            </figure>
            <figure className="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">

              <div className="pt-6 md:p-8 text-center md:text-left space-y-4 flex flex-col">
                <blockquote>
                  <p className="text-lg font-medium">“We use Luminou§kin in our digital literacy sessions. It empowers local youth.”</p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-sky-400">Aji, Sulawasi Selatan</div>
                  <div className="text-slate-700 dark:text-slate-500">Mahasiswa IT & Volunteer</div>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>
      <section className='h-fit bg-cold-2 items-center gap-10 p-5'>

        <FeedbackForm/>
      </section>
      <section className="bg-blue-400 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          <div>
            <h1 className="text-4xl font-bold mb-4">Luminou§kin</h1>
            <p className="text-sm">Solusi digital inklusif untuk kesehatan kulit masyarakat Indonesia.</p>
          </div>


          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Website
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-semibold mb-3">Education</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Skin Disease Type
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Drug Recommendation
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Tips Health Skin
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-semibold mb-3">Legal</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
