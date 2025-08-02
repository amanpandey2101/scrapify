"use client";
import { TypewriterEffectSmooth } from "@/components/accernity-ui/TypeWriterEffect";
import { Button } from "@/components/ui/button";
import { pricingPlans, typeWriterWords } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, SparklesIcon } from "lucide-react";
import { FeaturesSection } from "./_components/Feature";
import { FeaturesGradient } from "./_components/FeaturesGradient";

import { HoverEffect } from "@/components/accernity-ui/CardHover";
import Link from "next/link";
import Navbar from "./_components/Navbar";

export default function HomeLandingPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4 selection:bg-primary selection:text-white dark bg-[#0C0A09] ">
      <Navbar />
      
      {/* Hero Section */}
      <SectionWrapper className="min-h-[90vh] text-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Web Scraping Made Simple
          </div>
          
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent">
              SCRAPIFY
            </h1>
            <TypewriterEffectSmooth
              words={typeWriterWords}
              className="mb-0 space-y-0"
              cursorClassName="bg-primary"
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Create, automate, and scale your web scraping projects with ease. No coding required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/sign-in">
              <Button className="group px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
                <ChevronRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="px-8 py-6 text-lg rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              onClick={() => document.getElementById('howItWorks')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
          
          {/* Credit offer */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-600 dark:text-green-400 font-medium backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 mr-2" />
            New users get 200 credits for free upon first login
          </div>
        </div>
      </SectionWrapper>
      
      {/* How It Works Section */}
      <SectionWrapper
        id="howItWorks"
        primaryTitle="How"
        secondaryTitle="It Works"
        className="bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
      >
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl text-center mb-8">
          Our intuitive workflow builder makes web scraping accessible to everyone, from beginners to experts.
        </p>
        <FeaturesGradient />
      </SectionWrapper>
      
      {/* Features Section */}
      <SectionWrapper
        id="scrapingFeatures"
        primaryTitle="Scraping"
        secondaryTitle="Features"
        className="bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"
      >
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl text-center mb-8">
          Powerful tools and actions to handle any web scraping scenario with precision and reliability.
        </p>
        <FeaturesSection />
      </SectionWrapper>
      
      {/* Pricing Section */}
      <SectionWrapper
        id="pricing"
        className="py-20 md:py-32 w-full bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
        primaryTitle="Simple"
        secondaryTitle="Pricing"
      >
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl text-center mb-12">
          Choose the perfect plan for your scraping needs. All plans include full access to our powerful features.
        </p>
        <div className="flex gap-6 w-full">
          <HoverEffect items={[...pricingPlans]} />
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper className="text-center py-20 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Start Scraping Today
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Join thousands of users who are already leveraging our powerful web scraping platform to automate their data collection.
            </p>
            
            <div className="pt-6">
              <Link href="/sign-in">
                <Button className="group px-10 py-6 text-lg rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Sign Up Now
                  <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No credit card required • Start with 300 free credits • Cancel anytime
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function SectionWrapper({
  children,
  className,
  id,
  primaryTitle,
  secondaryTitle,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  primaryTitle?: string;
  secondaryTitle?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-8 py-16 md:py-20 box-border max-w-screen-xl mx-auto scroll-mt-[80px] px-4 md:px-6 lg:px-8",
        className
      )}
      id={id}
    >
      {(primaryTitle || secondaryTitle) && (
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100">
            <span className="text-primary">{primaryTitle}</span>{" "}
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
              {secondaryTitle}
            </span>
          </h2>
        </div>
      )}
      {children}
    </section>
  );
}
