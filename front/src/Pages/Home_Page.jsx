import HorizontalScrollSection from '@/components/card-scroller';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bandage, Book, Bot, Camera, Image, LineChart, Map, Play, Text } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
// implementing Gsap animamtion for card in feature section
// import { gsap } from 'gsap'
// import { useEffect,  } from 'react'
// import { useRef } from 'react'
// import { useInView } from 'react-intersection-observer'
// import { cn } from '@/lib/utils'
// import { useAnimation } from 'framer-motion'
// import { useState } from 'react'
// import { useCallback } from 'react'
// import { useMemo } from 'react'
// import { useSpring, animated } from 'react-spring'
// import CardScroller from '@/components/card-scroller'
export const HomePage = () => {
  return (
    <>
      <section className="relative w-full h-screen bg-cover bg-center bg-[url('/bg_hero.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative  flex flex-col justify-center items-start h-full px-6 md:px-20 text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold max-w-xl">Luminou§kin</h1>
          <h2 className="text-4xl md:text-5xl font-bold max-w-xl">Accessible Healthcare for Every Community</h2>
          <p className="text-lg md:text-xl max-w-lg">Connecting rural areas with professional medical solutions through advanced technology and compassionate care.</p>
          <div className="flex gap-5">
            <Button href="#learn-more" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg text-white font-medium transition">
              Diagnose
            </Button>
            <Button href="#learn-more" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <section className=" grid grid-cols-2 h-fit items-center gap-x-10 p-5 bg-teal-300">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className=" text-center">
          {/* <h1 className='text-5xl '>Tujuan Kami</h1> */}
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
      <section className="h-fit xl:h-screen flex flex-col justify-center bg-teal-200 gap-10 items-center">
        <h1 className="text-5xl font-quicksand font-black">Feature Yang Disediakan</h1>
        <div className="flex-col p-10 flex gap-10 xl:flex-row">
          <Card className="flex flex-col justify-between">
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
          <Card className="flex flex-col justify-between">
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
          <Card className="flex flex-col justify-between">
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
          <Card className="flex flex-col justify-between">
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
      {/* <section className=' h-screen flex flex-col  justify-center  '>
        <h1 className=' text-center text-5xl font-quicksand'>How its Works</h1>
        <div className="grid grid-flow-col p-10 gap-1 overflow-auto ">


          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between  w-fit">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent className={'flex flex-col gap-5 '}>
                <CardTitle className={'text-4xl text-center font-quicksand '}>Login</CardTitle>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>User Login Registration </CardTitle>
                <Input readOnly />
                <Input readOnly />
              </CardContent>
              <CardFooter className={'flex justify-center'}>
                <Button variant="outline">Login</Button>
                <Button variant="ghost">Sign Up</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between w-fit ">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent className={'flex flex-col items-center gap-5'}>
                <CardTitle className={'text-4xl text-center font-quicksand'}>Upload / Take Photo</CardTitle>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Mendiagnosis penyakit kulit dengan foto</CardTitle>
                <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                  <Camera className='w-10 h-10' />
                </div>
              </CardContent>
              <CardFooter className={'flex justify-center gap-5'}>
                <Button variant="outline">Upload Image</Button>
                <Button variant="outline">Take Photo</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between w-fit">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent className={'flex flex-col items-center '}>
                <CardTitle className={'text-4xl text-center font-quicksand'}>Result Diagnose</CardTitle>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Hasil dari pengecekan penyakit</CardTitle>
                <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                  <Image className='w-10 h-10' />
                </div>
                <CardTitle>Kondisi Kulit</CardTitle>
                <Text className='w-15 h-15 self-start ' />
                <CardTitle>Pengobatan</CardTitle>
                <Text className='w-15 h-15 self-start ' />

              </CardContent>
              <CardFooter className={'flex justify-center'}>
                <Button variant="outline">Clinic Terdekat</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between w-fit">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent>
                <CardTitle className={'text-4xl text-center font-quicksand'}>Save History</CardTitle>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Simpan hasil diagnosa ke account  </CardTitle>
              </CardContent>
              <CardFooter className={'flex justify-center'}>
                <Button variant="outline">Simpan</Button>
                <Button variant="outline">Hapus</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between w-fit">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent className={'flex flex-col items-center '}>

                <CardTitle className={'text-4xl text-center font-quicksand'}>Health Education</CardTitle>
                <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                  <Play className='w-10 h-10' />
                </div>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Informasi mengenai penyakit kulit </CardTitle>
                <Text className='w-15 h-15 self-start ' />

              </CardContent>
              <CardFooter className={'flex justify-center'}>

              </CardFooter>
            </Card>
          </div>
          <div className="w-screen flex justify-center">
            <Card className="flex flex-col justify-between w-fit">
              <CardHeader className={'flex flex-col items-center justify-center'}>

              </CardHeader>
              <CardContent className={'flex flex-col items-center '}>

                <CardTitle className={'text-4xl text-center font-quicksand'}>Dashboard Data</CardTitle>
                <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                  <LineChart className='w-10 h-10' />
                </div>
                <CardTitle className={'font-light text-2xl text-center font-quicksand'}>Informasi mengenai penyakit kulit </CardTitle>
                <Text className='w-15 h-15 self-start ' />

              </CardContent>
              <CardFooter className={'flex justify-center'}>

              </CardFooter>
            </Card>
          </div>

        </div>
      </section> */}
      <HorizontalScrollSection />
      <section className="h-screen bg-cyan-500 flex flex-col gap-5 p-4 items-center justify-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-quicksand font-black">User Testimoni</h1>
          <div className="flex gap-5">
            <figure class="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">
              <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="" alt="IMG" width="384" height="512" />
              <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p class="text-lg font-medium">“Finally, I can understand my skin problem without traveling 3 hours to the clinic.”</p>
                </blockquote>
                <figcaption class="font-medium">
                  <div class="text-sky-500 dark:text-sky-400">Ria, Nusa Tenggara Timur</div>
                  <div class="text-slate-700 dark:text-slate-500">Housewife</div>
                </figcaption>
              </div>
            </figure>
            <figure class="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">
              <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="" alt="IMG" width="384" height="512" />
              <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p class="text-lg font-medium">“This helps us reach more people faster and give them accurate skin care advice.”</p>
                </blockquote>
                <figcaption class="font-medium">
                  <div class="text-sky-500 dark:text-sky-400">Pak Peri, Kalimantan Barat</div>
                  <div class="text-slate-700 dark:text-slate-500">Puskesmas Staff</div>
                </figcaption>
              </div>
            </figure>
            <figure class="shadow-2xl md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 h-full">
              <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="" alt="IMG" width="384" height="512" />
              <div class="pt-6 md:p-8 text-center md:text-left space-y-4 flex flex-col">
                <blockquote>
                  <p class="text-lg font-medium">“We use Luminou§kin in our digital literacy sessions. It empowers local youth.”</p>
                </blockquote>
                <figcaption class="font-medium">
                  <div class="text-sky-500 dark:text-sky-400">Aji, Sulawasi Selatan</div>
                  <div class="text-slate-700 dark:text-slate-500">Mahasiswa IT & Volunteer</div>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>
      <section className="h-screen bg-cyan-400 grid grid-cols-2 items-center gap-10 p-5">
        <div className="aspect-video rounded-xl bg-muted/50" />

        <Card>
          <CardHeader className={'text-center'}>
            <CardTitle className={'text-3xl'}>Give Us Feedback</CardTitle>
            <CardDescription>Share your though about this website to improve our works</CardDescription>
          </CardHeader>
          <CardContent className={'grid grid-cols-2 gap-x-2'}>
            <div className="flex flex-col gap-2">
              <Label htmlfor="name">Full Name</Label>
              <Input id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlfor="email">Email Address</Label>
              <Input id="email" />
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="h-fit bg-emerald-900 grid grid-cols-2 items-center justify-center p-10">
        <div className="">
          <h1 className="text-5xl">Luminou§kin</h1>
        </div>
        <div className="grid grid-cols-3">
          <h1 className="text-4xl">About</h1>
          <h1 className="text-4xl">Education</h1>
          <h1 className="text-4xl">Legal</h1>
          <Link to={'/'} className=" hover:text-white">
            Website
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Skin Disease Type
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Terms of Service
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Our Team
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Drug Recomendation
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Privacy Policy
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Contact Us
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Tips health skin
          </Link>
          <Link to={'/'} className=" hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </section>
    </>
  );
};
