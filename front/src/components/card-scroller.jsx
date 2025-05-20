import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Image, LineChart, Map, Play, Text } from "lucide-react";
// import { Text } from "@/components/ui/text"; // Adjust if it's a custom component

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSections = gsap.utils.toArray(".horizontal-section");

      gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#horizontal-scroll-container",
          pin: true,
          scrub: 1,
          snap: 1 / (horizontalSections.length - 1),
          end: () => "+=" + document.querySelector("#horizontal-scroll-container").offsetWidth,
        },
      });

      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="horizontal-scroll-wrapper" ref={sectionRef} className="relative h-fit w-full overflow-hidden">
      <h1 className="absolute top-10 w-full text-center text-5xl font-quicksand z-10">How it Works</h1>

      <div
        ref={scrollContainerRef}
        className="flex w-max h-screen items-center space-x-4 px-10 bg-cyan-200"
        id="horizontal-scroll-container"
      >
        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader className="flex items-center justify-center" />
            <CardContent className="flex flex-col gap-5">
              <CardTitle className="text-4xl text-center font-quicksand">Login</CardTitle>
              <CardTitle className="font-light text-2xl text-center font-quicksand">User Login Registration</CardTitle>
              <Input readOnly />
              <Input readOnly />
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline">Login</Button>
              <Button variant="ghost">Sign Up</Button>
            </CardFooter>
          </Card>
          <h1 className="text-4xl font-quicksand">Create a free account to start diagnosis journey</h1>
        </div>

        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader className="flex items-center justify-center" />
            <CardContent className="flex flex-col items-center gap-5">
              <CardTitle className="text-4xl text-center font-quicksand">Upload / Take Photo</CardTitle>
              <CardTitle className="font-light text-2xl text-center font-quicksand">Mendiagnosis penyakit kulit dengan foto</CardTitle>
              <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                <Camera className="w-10 h-10" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-5">
              <Button variant="outline">Upload Image</Button>
              <Button variant="outline">Take Photo</Button>
            </CardFooter>
          </Card>
          <h1 className="text-4xl font-quicksand ">Use your phone camera or upload a claer image of the affected skin</h1>
        </div>

        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader />
            <CardContent className="flex flex-col items-center">
              <CardTitle className="text-4xl text-center font-quicksand">Result Diagnose</CardTitle>
              <CardTitle className="font-light text-2xl text-center font-quicksand">Hasil dari pengecekan penyakit</CardTitle>
              <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                <Image className="w-10 h-10" />
              </div>
              <CardTitle>Kondisi Kulit</CardTitle>
              <Text className="w-15 h-15 self-start" />
              <CardTitle>Pengobatan</CardTitle>
              <Text className="w-15 h-15 self-start" />
            </CardContent>
            <CardFooter className="flex justify-center">
            </CardFooter>
          </Card>
          <h1 className="text-4xl font-quicksand ">Get diagnosis and simple treatment advice based on your diagnosis</h1>
        </div>

        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader />
            <CardContent className={'flex flex-col items-center justify-center'}>
              <CardTitle className="text-4xl text-center font-quicksand">Clinic Terdekat</CardTitle>
              <CardTitle className="font-light text-2xl text-center font-quicksand">Cari Tahu Clinic Terdekat</CardTitle>
               <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                <Map className="w-10 h-10" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline">Simpan</Button>
              <Button variant="outline">Hapus</Button>
            </CardFooter>
          </Card>
          <h1 className="text-4xl font-quicksand ">If needed, find clinics or pharmacies near your area</h1>
        </div>

        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader />
            <CardContent className="flex flex-col items-center">
              <CardTitle className="text-4xl text-center font-quicksand">Health Education</CardTitle>
              <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                <Play className="w-10 h-10" />
              </div>
              <CardTitle className="font-light text-2xl text-center font-quicksand">Informasi mengenai penyakit kulit</CardTitle>
              <Text className="w-15 h-15 self-start" />
            </CardContent>
          </Card>
          <h1 className="text-4xl font-quicksand ">Access our digital skin health education hub</h1>
        </div>

        
        <div className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit">
            <CardHeader />
            <CardContent className="flex flex-col items-center">
              <CardTitle className="text-4xl text-center font-quicksand">Dashboard Data</CardTitle>
              <div className="aspect-video w-50 h-50 bg-muted/50 flex items-center justify-center">
                <LineChart className="w-10 h-10" />
              </div>
              <CardTitle className="font-light text-2xl text-center font-quicksand">Informasi mengenai penyakit kulit</CardTitle>
              <Text className="w-15 h-15 self-start" />
            </CardContent>
          </Card>
          <h1 className="text-4xl font-quicksand text-left">Stay informed with your personalized <br /> health dashboard</h1>
        </div>
      </div>
    </section>
  );
}