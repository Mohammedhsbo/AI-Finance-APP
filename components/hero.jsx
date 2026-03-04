"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="px-4 pb-20 pt-40">
      <div className="container mx-auto text-center">
        <h1 className="pb-6 text-5xl font-bold leading-[0.95] md:text-7xl lg:text-[96px]">
          <span className="gradient-title">Manage Your Finances <br />with Intelligence</span>
          <br />

        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 rounded-full bg-blue-600 px-9 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-8 md:mt-2">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="mx-auto rounded-2xl border border-black/10 shadow-2xl shadow-black/10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
