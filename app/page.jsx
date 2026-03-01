import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff_0%,_#ffffff_50%)]">
      <HeroSection />

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-black/5 bg-gradient-to-b from-white to-blue-50/60 p-6 text-center shadow-sm"
              >
                <div className="mb-2 text-3xl font-bold text-blue-700 md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Product Features
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need to manage your finances
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card
                className="group border-black/5 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  {step.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
                <p className="leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="border-black/5 bg-white p-6 shadow-sm">
                <CardContent className="pt-4">
                  <div className="mb-4 flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-blue-100"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-sky-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-blue-100">
            Join thousands of users who are already managing their finances
            smarter with Welth
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 rounded-full bg-white px-8 text-blue-700 shadow-lg shadow-black/10 hover:bg-blue-50"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
