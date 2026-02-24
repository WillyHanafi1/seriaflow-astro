"use client";

import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { Vortex } from "@/components/ui/vortex";

const features = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    icon: CircleDot,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    icon: Blend,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    icon: Diamond,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    icon: ChartNoAxesColumn,
  },
];

export const Hero = () => {
  // Read the actual CSS --background variable so Vortex adapts to light/dark theme
  const [bgColor, setBgColor] = useState("transparent");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);

      // Resolve the CSS --background oklch value to an rgb string for the canvas
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      const tmp = document.createElement("div");
      tmp.style.color = `oklch(${raw})`;
      document.body.appendChild(tmp);
      const resolved = getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      setBgColor(resolved || "transparent");
    };

    updateTheme();

    // Re-read on theme toggle (dark class change)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <Vortex
        backgroundColor={bgColor}
        rangeY={800}
        baseSpeed={1}
        rangeSpeed={1}
        containerClassName="w-full"
        className="flex flex-col py-28 lg:py-32 lg:pt-44 w-full"
      >
        <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
          {/* Left side - Main content */}
          <div className="flex-1">
            <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
              Seriaflow AI Agency
            </h1>

            <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
              Automate your business with cutting-edge AI workflows, intelligent
              agents, and modern web solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
              <Button asChild>
                <a href="/contact">Get started</a>
              </Button>
              <Button
                variant="outline"
                className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
                asChild
              >
                <a href="/pricing">
                  View pricing
                  <ArrowRight className="stroke-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
            <DashedLine
              orientation="vertical"
              className="absolute top-0 left-0 max-lg:hidden"
            />
            <DashedLine
              orientation="horizontal"
              className="absolute top-0 lg:hidden"
            />
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                  <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                  <div>
                    <h2 className="font-text text-foreground font-semibold">
                      {feature.title}
                    </h2>
                    <p className="text-muted-foreground max-w-76 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
          <div className="relative h-[793px] w-full">
            <img
              src="/hero.webp"
              alt="hero"
              className="h-full w-full rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
            />
          </div>
        </div>
      </Vortex>
    </section>
  );
};
