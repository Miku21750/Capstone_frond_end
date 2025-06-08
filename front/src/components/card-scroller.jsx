import React, { useLayoutEffect, useRef , useEffect} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Image, LineChart, Map, Play, Text } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray(".horizontal-section");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#horizontal-scroll-container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        invalidateOnRefresh: true,
        end: () => "+=" + window.innerWidth * (sections.length - 1),
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
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
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-cyan-100 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">How It Works</h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Scroll horizontally to explore how our skin diagnosis journey works — from uploading an image to tracking your health progress.
        </p>
        <div className="mt-10 animate-bounce text-gray-600">↓ Scroll</div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" id="scroll-progress" />

      <TooltipProvider>
        <div
          ref={scrollContainerRef}
          className="flex w-max h-screen items-center space-x-4 bg-cyan-50"
          id="horizontal-scroll-container"
        >
          {/* === CARDS === */}
          {cardsData.map((card, index) => (
            <section
              key={index}
              className="w-screen flex items-center justify-center flex-shrink-0 horizontal-section"
            >
              <Card className="w-[90%] md:w-[70%] lg:w-[50%] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className={`flex items-center justify-center p-4 rounded-t-xl ${card.bg}`}>
                  {React.createElement(card.icon, { className: "w-12 h-12 text-white" })}
                </CardHeader>
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
    title: "Capture or Upload",
    description:
      "Begin by capturing a clear image or uploading one from your device. Make sure lighting is good for better results.",
    icon: Camera,
    bg: "bg-gradient-to-r from-blue-500 to-teal-500",
    actions: [
      { label: "Upload", tooltip: "Select a photo from your device" },
      { label: "Take Photo", tooltip: "Use your camera to capture" },
    ],
  },
  {
    title: "Diagnosis Results",
    description:
      "Get an AI-driven diagnosis with a detailed breakdown and medical suggestions.",
    icon: Image,
    bg: "bg-gradient-to-r from-green-500 to-yellow-500",
    actions: [],
  },
  {
    title: "Nearby Clinics",
    description:
      "Locate and connect with nearby clinics for further advice and prescriptions.",
    icon: Map,
    bg: "bg-gradient-to-r from-red-500 to-orange-500",
    actions: [
      { label: "Save", tooltip: "Save this clinic to your dashboard" },
      { label: "Delete", tooltip: "Remove from your list" },
    ],
  },
  {
    title: "Health Education",
    description:
      "Access a knowledge hub with videos and articles to better understand skin care.",
    icon: Play,
    bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    actions: [],
  },
  {
    title: "Health Dashboard",
    description:
      "Track your treatment, monitor conditions, and view insights on your skin's progress.",
    icon: LineChart,
    bg: "bg-gradient-to-r from-sky-500 to-blue-600",
    actions: [],
  },
];
