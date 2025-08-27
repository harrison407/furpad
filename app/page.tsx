'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import { Rocket, Coins, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { LaunchpadForm } from '@/components/LaunchpadForm'
import { Header } from '@/components/Header'
import { useState, useEffect } from 'react'

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const totalSections = 2

  const nextSection = () => {
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1))
  }

  const prevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0))
  }

  const goToDeploySection = () => {
    setCurrentSection(1)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSection()
      } else if (e.key === 'ArrowLeft') {
        prevSection()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaX > 0 && currentSection < totalSections - 1) {
        // Swipe right - go to next section only if not at the end
        nextSection()
      } else if (e.deltaX < 0 && currentSection > 0) {
        // Swipe left - go to previous section only if not at the beginning
        prevSection()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection, totalSections])

  return (
    <div className="h-screen overflow-hidden relative">
      <Header />

      {/* Navigation Arrows */}
      <div className="fixed top-1/2 left-2 sm:left-4 z-50 transform -translate-y-1/2">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 sm:p-3 transition-all duration-300 text-white ${
            currentSection === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>
      
      <div className="fixed top-1/2 right-2 sm:right-4 z-50 transform -translate-y-1/2">
        <button
          onClick={nextSection}
          disabled={currentSection === totalSections - 1}
          className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 sm:p-3 transition-all duration-300 text-white ${
            currentSection === totalSections - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
          }`}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        className="flex h-screen transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Section 1: Hero */}
        <div className="w-screen h-screen flex-shrink-0 relative overflow-y-auto sm:overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/furpad.png" 
              alt="Furpad Background" 
              className="w-full h-full sm:h-full min-h-screen object-cover object-center"
            />
            {/* Translucent yellow overlay to tone down the vibrant background */}
            <div className="absolute inset-0 min-h-screen bg-gradient-to-b from-[#fdbf36]/80 via-[#fbbf24]/70 to-[#fdbf36]/85"></div>
            {/* Additional overlay for better text readability */}
            <div className="absolute inset-0 min-h-screen bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full min-h-screen flex items-center justify-center pt-28 sm:pt-0 sm:h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-12 sm:pt-0"
            >
                  {/* Title and Subtitle */}
                              <div className="mb-6 sm:mb-8 relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2">
                <span className="text-gradient">Furpad</span> 🐾
              </h1>
                    {/* Diamond to the left of title */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    {/* Scattered diamonds around the left diamond */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-32 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.1s', animationDuration: '2.8s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-24 translate-y-32 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.7s', animationDuration: '3.1s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-48 -translate-y-24 w-3 h-3 animate-pulse opacity-45" style={{ animationDelay: '2.0s', animationDuration: '2.5s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-20 translate-y-48 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '0.4s', animationDuration: '2.9s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-56 -translate-y-8 w-2 h-2 animate-pulse opacity-50" style={{ animationDelay: '1.6s', animationDuration: '3.3s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-28 -translate-y-40 w-3 h-3 animate-pulse opacity-55" style={{ animationDelay: '0.9s', animationDuration: '2.7s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-52 translate-y-16 w-2 h-2 animate-pulse opacity-45" style={{ animationDelay: '2.3s', animationDuration: '3.0s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-36 -translate-y-32 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '0.2s', animationDuration: '2.4s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-60 translate-y-24 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.8s', animationDuration: '2.6s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-16 translate-y-56 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.6s', animationDuration: '3.2s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-44 -translate-y-16 w-4 h-4 animate-pulse opacity-45" style={{ animationDelay: '2.1s', animationDuration: '2.8s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-40 translate-y-40 w-3 h-3 animate-pulse opacity-60" style={{ animationDelay: '1.3s', animationDuration: '3.1s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-64 -translate-y-4 w-2 h-2 animate-pulse opacity-50" style={{ animationDelay: '0.8s', animationDuration: '2.7s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 translate-y-64 w-4 h-4 animate-pulse opacity-55" style={{ animationDelay: '2.4s', animationDuration: '3.3s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-68 -translate-y-20 w-3 h-3 animate-pulse opacity-45" style={{ animationDelay: '1.5s', animationDuration: '2.9s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-32 translate-y-48 w-2 h-2 animate-pulse opacity-60" style={{ animationDelay: '0.4s', animationDuration: '3.0s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-72 -translate-y-12 w-4 h-4 animate-pulse opacity-50" style={{ animationDelay: '2.0s', animationDuration: '2.6s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8 translate-y-72 w-3 h-3 animate-pulse opacity-55" style={{ animationDelay: '1.7s', animationDuration: '3.2s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-76 -translate-y-28 w-2 h-2 animate-pulse opacity-45" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-24 translate-y-56 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '2.2s', animationDuration: '3.1s' }}>
                      <div className="w-full h-full bg-white transform rotate-45 relative">
                        <div className="absolute inset-0 bg-white transform rotate-90"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-80 -translate-y-8 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.1s', animationDuration: '2.7s' }}>
                      <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                        <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                      </div>
                    </div>
                    
                                         <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 translate-y-80 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.7s', animationDuration: '3.3s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     {/* Scattered diamonds around the right diamond */}
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-32 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.3s', animationDuration: '2.9s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-24 translate-y-32 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-48 -translate-y-24 w-3 h-3 animate-pulse opacity-45" style={{ animationDelay: '2.1s', animationDuration: '2.6s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-20 translate-y-48 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '0.5s', animationDuration: '3.0s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-56 -translate-y-8 w-2 h-2 animate-pulse opacity-50" style={{ animationDelay: '1.7s', animationDuration: '3.4s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-28 -translate-y-40 w-3 h-3 animate-pulse opacity-55" style={{ animationDelay: '1.0s', animationDuration: '2.8s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-52 translate-y-16 w-2 h-2 animate-pulse opacity-45" style={{ animationDelay: '2.4s', animationDuration: '3.1s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-36 -translate-y-32 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '0.3s', animationDuration: '2.5s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-60 translate-y-24 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.9s', animationDuration: '2.7s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-16 translate-y-56 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.6s', animationDuration: '3.2s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-44 -translate-y-16 w-4 h-4 animate-pulse opacity-45" style={{ animationDelay: '2.1s', animationDuration: '2.8s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-40 translate-y-40 w-3 h-3 animate-pulse opacity-60" style={{ animationDelay: '1.3s', animationDuration: '3.1s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-64 -translate-y-4 w-2 h-2 animate-pulse opacity-50" style={{ animationDelay: '0.8s', animationDuration: '2.7s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 translate-y-64 w-4 h-4 animate-pulse opacity-55" style={{ animationDelay: '2.4s', animationDuration: '3.3s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-68 -translate-y-20 w-3 h-3 animate-pulse opacity-45" style={{ animationDelay: '1.5s', animationDuration: '2.9s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-32 translate-y-48 w-2 h-2 animate-pulse opacity-60" style={{ animationDelay: '0.4s', animationDuration: '3.0s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-72 -translate-y-12 w-4 h-4 animate-pulse opacity-50" style={{ animationDelay: '2.0s', animationDuration: '2.6s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-8 translate-y-72 w-3 h-3 animate-pulse opacity-55" style={{ animationDelay: '1.7s', animationDuration: '3.2s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-76 -translate-y-28 w-2 h-2 animate-pulse opacity-45" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-24 translate-y-56 w-4 h-4 animate-pulse opacity-60" style={{ animationDelay: '2.2s', animationDuration: '3.1s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-80 -translate-y-8 w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.1s', animationDuration: '2.7s' }}>
                       <div className="w-full h-full bg-yellow-200 transform rotate-45 relative">
                         <div className="absolute inset-0 bg-yellow-200 transform rotate-90"></div>
                       </div>
                     </div>
                     
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 translate-y-80 w-2 h-2 animate-pulse opacity-55" style={{ animationDelay: '0.7s', animationDuration: '3.3s' }}>
                       <div className="w-full h-full bg-white transform rotate-45 relative">
                         <div className="absolute inset-0 bg-white transform rotate-90"></div>
                       </div>
                     </div>
                     <div className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
                      Launchpad
                    </div>
                  </div>
                  
                  <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-12 max-w-3xl mx-auto drop-shadow-lg px-4">
                Deploy your memecoin with ease. Configure taxes, LP allocation, and wallet distributions in minutes.
              </p>
              
                  <div className="flex justify-center items-center mb-6 sm:mb-16 px-4">
                <motion.button
                      onClick={goToDeploySection}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-600 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center shadow-lg text-sm sm:text-base"
                >
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Launch Your Token
                </motion.button>
              </div>

                  {/* Features Section - Moved into hero */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 mt-6 sm:mt-0 pb-8 sm:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 hover:bg-black/50 hover:border-white/50 hover:shadow-xl"
            >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-primary-500/30">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
              </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
                      <p className="text-sm sm:text-base text-white/90">Deploy your token in under 5 minutes with our streamlined process.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 hover:bg-black/50 hover:border-white/50 hover:shadow-xl"
            >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-secondary-500/30">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-400" />
              </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Secure & Audited</h3>
                      <p className="text-sm sm:text-base text-white/90">Battle-tested smart contracts with comprehensive security measures.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 hover:bg-black/50 hover:border-white/50 hover:shadow-xl"
            >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-primary-500/30">
                <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Customizable</h3>
                      <p className="text-sm sm:text-base text-white/90">Full control over taxes, LP allocation, and wallet distributions.</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Launchpad Form */}
        <div className="w-screen h-screen flex-shrink-0 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/deploy.png" 
              alt="Deploy Background" 
              className="w-full h-full object-cover object-center"
            />
            {/* Translucent yellow overlay to tone down the vibrant background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fdbf36]/80 via-[#fbbf24]/70 to-[#fdbf36]/85"></div>
            {/* Additional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 pt-32 sm:pt-4">
            <div className="max-w-3xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card max-h-[75vh] sm:max-h-[80vh] overflow-y-auto"
              >
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Deploy Your Token</h2>
                  <p className="text-sm sm:text-base text-white/90">Configure your token parameters and launch your memecoin</p>
                </div>
                <LaunchpadForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      {showDisclaimer && (
        <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-50">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-lg p-3 sm:p-4 text-center relative">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-1 sm:top-2 right-1 sm:right-2 text-white/70 hover:text-white transition-colors duration-200 text-base sm:text-lg font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
            <p className="text-xs text-white/70 leading-relaxed pr-4 sm:pr-6">
              <strong>Disclaimer:</strong> This platform is for educational and entertainment purposes only. 
              The information provided does not constitute financial advice, investment recommendations, or any form of professional guidance. 
              Cryptocurrency investments carry significant risks, including the potential for total loss of capital. 
              Always conduct your own research and consult with qualified financial advisors before making any investment decisions. 
              Past performance does not guarantee future results. Use at your own risk.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
