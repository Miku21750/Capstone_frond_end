import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Image, LineChart, Map, Play, Text } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
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
end: () => "+=" + window.innerWidth * (horizontalSections.length - 1),
        },
      });

      horizontalSections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="horizontal-scroll-wrapper" ref={sectionRef} className="relative h-fit w-full overflow-hidden">
      <h1 className="absolute top-10 w-full text-center text-5xl font-quicksand z-10 font-black">How it Works</h1>

      <div
        ref={scrollContainerRef}
        className="flex w-max h-screen items-center space-x-4  bg-cyan-200"
        id="horizontal-scroll-container"
      >
        <section className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-t-xl">
              <Camera className="w-12 h-12 text-white" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <CardTitle className="text-3xl text-center font-quicksand text-gray-800">Capture or Upload</CardTitle>
              <p className="text-lg text-center font-light text-gray-600">
                Begin your diagnosis journey by capturing a photo or uploading an image of the affected area. Ensure the image is clear and well-lit for accurate results.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="w-40">Upload Image</Button>
                <Button variant="outline" className="w-40">Take Photo</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex items-center justify-center bg-gradient-to-r from-green-500 to-yellow-500 p-4 rounded-t-xl">
              <Image className="w-12 h-12 text-white" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <CardTitle className="text-3xl text-center font-quicksand text-gray-800">Diagnosis Results</CardTitle>
              <p className="text-lg text-center font-light text-gray-600">
                Receive a detailed analysis of your skin condition along with recommended treatments. The results are based on the latest dermatological research.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <Text className="w-16 h-16 text-gray-500" />
                </div>
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <Text className="w-16 h-16 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-t-xl">
              <Map className="w-12 h-12 text-white" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <CardTitle className="text-3xl text-center font-quicksand text-gray-800">Nearby Clinics</CardTitle>
              <p className="text-lg text-center font-light text-gray-600">
                Locate clinics or pharmacies near your area for further consultation or medication. Use the map feature to find the most convenient options.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="w-40">Save</Button>
                <Button variant="outline" className="w-40">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-t-xl">
              <Play className="w-12 h-12 text-white" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <CardTitle className="text-3xl text-center font-quicksand text-gray-800">Health Education</CardTitle>
              <p className="text-lg text-center font-light text-gray-600">
                Access our digital skin health education hub to learn more about various skin conditions, how to prevent them, and maintain healthier skin through expert-guided videos and articles.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="w-screen flex items-center justify-center gap-10 flex-shrink-0 horizontal-section">
          <Card className="w-fit shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-t-xl">
              <LineChart className="w-12 h-12 text-white" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <CardTitle className="text-3xl text-center font-quicksand text-gray-800">Health Dashboard</CardTitle>
              <p className="text-lg text-center font-light text-gray-600">
                Stay updated with a personalized dashboard that tracks your diagnoses, treatment progress, and skin health trends over time.
              </p>
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <Text className="w-16 h-16 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </section>
  );
}

 
