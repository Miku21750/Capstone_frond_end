import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Image, LineChart, Map, Play, Text } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.horizontal-section');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '#horizontal-scroll-container',
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          invalidateOnRefresh: true,
          end: () => '+=' + window.innerWidth * (sections.length - 1),
        },
      });

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // 🔥 Force a recalculation on page load
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section ref={sectionRef} className="relative w-full h-fit overflow-hidden">
      {/* Intro Header */}
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-cyan-100 text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Cara Kerjanya</h1>
        <p className="text-base md:text-xl text-gray-700 max-w-2xl">
                Scroll secara horizontal untuk menjelajahi cara kerja perjalanan diagnosis kulit kami — mulai dari mengunggah gambar hingga melacak kemajuan kesehatan Anda.
        </p>
        <div className="mt-8 md:mt-10 animate-bounce text-gray-600 text-lg">↓ Scroll</div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" id="scroll-progress" />

      <TooltipProvider>
        <div ref={scrollContainerRef} className="flex w-max h-screen items-center space-x-0 sm:space-x-4 bg-[#E9F3F4]" id="horizontal-scroll-container">
          {/* === CARDS === */}
          {cardsData.map((card, index) => (
            <section
              key={index}
              className="w-screen flex items-center justify-center flex-shrink-0 horizontal-section px-4"
            >
              <Card className="w-full mx-auto sm:w-[100%] md:w-[70%] lg:w-[60%] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className={`flex items-center justify-center p-4 md:p-6 rounded-t-xl ${card.bg}`}>
                  {React.createElement(card.icon, { className: `w-10 h-10 md:w-12 md:h-12 text-white animate-pulse` })}
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-5 p-4 md:p-6">
                                    {/* Illustration (if any) */}
                  {card.ilustration && (
                    <div className="flex justify-center mt-4">
                      <img src={card.ilustration} alt={card.title} className="w-60 h-50 md:w-90 md:h-80 ring-4 rounded-2xl ring-fuchsia-400" />
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <CardTitle className="text-2xl md:text-3xl text-center text-gray-800">{card.title}</CardTitle>
                    
                    {/* Short Description for quick glance */}
                    {card.shortDescription && (
                      <p className="text-md md:text-lg text-center text-gray-700 font-semibold">
                        {card.shortDescription}
                      </p>
                    )}

                    {/* Detailed Description for more info */}
                    <p className="text-sm md:text-lg text-center text-gray-600">
                      {card.description}
                    </p>

                    {/* Call to Action Button */}
                    {/* {card.callToAction && (
                      <div className="flex justify-center mt-4">
                        <Button className="bg-[#3674B5] hover:bg-[#2a5c8e] text-white font-bold py-2 px-4 rounded-full">
                          {card.callToAction}
                        </Button>
                      </div>
                    )} */}
                    {/* Existing Buttons or Custom Actions (if any) */}
                    {card.actions && card.actions.length > 0 && (
                      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-2">
                        {card.actions.map((action, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <Button variant="outline" className="w-full sm:w-36">
                                {action.label}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{action.tooltip}</TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
const cardsData = [
  {
    title: 'Tangkap atau Unggah',
    shortDescription: 'Mulai diagnosis kulit Anda dengan mudah.',
    description: 'Ambil gambar yang jelas atau unggah dari perangkat Anda. Pastikan pencahayaan yang baik untuk hasil diagnosis yang lebih akurat.',
    icon: Camera,
    bg: 'bg-[#3674B5]',
    ilustration: '/TakeImg.png',
    callToAction: 'Mulai Pindai',
    actions: [],
  },
  {
    title: 'Hasil Diagnosis',
    shortDescription: 'Dapatkan wawasan kulit Anda secara instan.',
    description: 'Diagnosis berbasis AI memberikan uraian terperinci tentang kondisi kulit Anda dan saran medis yang dipersonalisasi.',
    icon: Image,
    bg: 'bg-[#3674B5]',
    ilustration: '/ResultImg.png',
    callToAction: 'Lihat Hasil',
    actions: [],
  },
  {
    title: 'Klinik Terdekat',
    shortDescription: 'Temukan bantuan profesional di dekat Anda.',
    description: 'Hubungkan dengan klinik terdekat untuk konsultasi, resep, atau perawatan lanjutan berdasarkan diagnosis Anda.',
    icon: Map,
    bg: "bg-[#3674B5]",
    ilustration: '/NearMap.png',
    callToAction: 'Cari Klinik',
    actions: [],
  },
  {
    title: 'Pendidikan Kesehatan',
    shortDescription: 'Perdalam pengetahuan tentang kesehatan kulit.',
    description: 'Akses perpustakaan video dan artikel komprehensif untuk memahami lebih lanjut tentang kondisi kulit dan perawatan yang tepat.',
    icon: Play,
    bg: 'bg-[#3674B5]',
    ilustration: '/EduImg.png',
    callToAction: 'Pelajari Lebih Lanjut',
    actions: [],
  },
  {
    title: 'Dashboard Kesehatan',
    shortDescription: 'Pantau perjalanan kesehatan kulit Anda.',
    description: 'Lacak kemajuan perawatan, pantau perubahan kondisi, dan dapatkan wawasan yang dipersonalisasi tentang kesehatan kulit Anda dari waktu ke waktu.',
    icon: LineChart,
    bg: 'bg-[#3674B5]',
    callToAction: 'Lihat Dashboard',
    actions: [],
  },
];
