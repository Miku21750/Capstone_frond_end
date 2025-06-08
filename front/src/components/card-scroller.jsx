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
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-center bg-cover text-center px-6 py-12" style={{ backgroundImage: "url('/howitworks.jpg')" }}>
        <h1 className="text-5xl text-[#002d52] font-bold mb-4">Cara Kerjanya</h1>
        <p className="text-xl text-[#002d52] max-w-2xl">Scroll secara horizontal untuk menjelajahi cara kerja perjalanan diagnosis kulit kami — mulai dari mengunggah gambar hingga melacak kemajuan kesehatan Anda.</p>
        <div className="mt-10 animate-bounce text-[#002d52]">↓ Scroll</div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" id="scroll-progress" />

      <TooltipProvider>
        <div ref={scrollContainerRef} className="flex w-max h-screen items-center space-x-4 bg-[#E9F3F4]" id="horizontal-scroll-container">
          {/* === CARDS === */}
          {cardsData.map((card, index) => (
            <section key={index} className="w-screen flex items-center justify-center flex-shrink-0 horizontal-section">
              <Card className="w-[90%] md:w-[70%] lg:w-[50%] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className={`flex items-center justify-center p-4 rounded-t-xl ${card.bg}`}>{React.createElement(card.icon, { className: 'w-12 h-12 text-white' })}</CardHeader>
                <CardContent className="flex flex-col gap-5 p-6">
                  <CardTitle className="text-3xl text-center text-gray-800">{card.title}</CardTitle>
                  <p className="text-lg text-center text-gray-600">{card.description}</p>

                  {/* Buttons or Custom Actions */}
                  {card.actions && (
                    <div className="flex justify-center gap-4">
                      {card.actions.map((action, i) => (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <Button variant="outline" className="w-36">
                              {action.label}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{action.tooltip}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  )}
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
    description: 'Mulailah dengan mengambil gambar yang jelas atau mengunggahnya dari perangkat Anda. Pastikan pencahayaannya bagus untuk hasil yang lebih baik.',
    icon: Camera,
    bg: 'bg-[#3674B5]',
    actions: [
      { label: 'Unggah', tooltip: 'Pilih foto dari perangkat Anda' },
      { label: 'Ambil Foto', tooltip: 'Gunakan kamera Anda untuk mengambil foto' },
    ],
  },
  {
    title: 'Hasil Diagnosis',
    description: 'Dapatkan diagnosis berbasis AI dengan uraian terperinci dan saran medis.',
    icon: Image,
    bg: 'bg-[#3674B5]',
    actions: [],
  },
  {
    title: 'Klinik Terdekat',
    description: 'Temukan dan hubungi klinik terdekat untuk mendapatkan saran dan resep lebih lanjut.',
    icon: Map,
    bg: 'bg-[#3674B5]',
    actions: [
      { label: 'Simpan', tooltip: 'Simpan klinik ini ke dasbor Anda' },
      { label: 'Hapus', tooltip: 'Hapus dari daftar Anda' },
    ],
  },
  {
    title: 'Pendidikan Kesehatan',
    description: 'Akses pusat pengetahuan dengan video dan artikel untuk lebih memahami perawatan kulit.',
    icon: Play,
    bg: 'bg-[#3674B5]',
    actions: [],
  },
  {
    title: 'Dashboard Kesehatan',
    description: 'Lacak perawatan Anda, pantau kondisi, dan lihat wawasan tentang kemajuan kulit Anda.',
    icon: LineChart,
    bg: 'bg-[#3674B5]',
    actions: [],
  },
];
