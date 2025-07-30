import * as React from "react"
import Halaney from 'next/font/local';
import { useState, useRef, useEffect } from "react";

const ages = [2, 3, 4, 5, 6, 7] as const

const halaney = Halaney({
  src: '../../public/Halaney.otf',
  display: 'swap', // recommended for better UX
});

export default function Header({ searchTerm, setSearchTerm, selectedAge, setSelectedAge }: any) {
  
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the vertical scroll position is 0
      if (window.pageYOffset === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <header className="sticky top-0 z-10">
              <div className="container mx-auto px-6 py-6">
                <h1 className={`transition-all font-medium text-center text-shadow-lg text-gray-50 select-none ${halaney.className} ${isAtTop ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl -mt-2 -mb-3'}`}>Stuff My Kids Ask</h1>
                
                
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                  />
                </div>
                
                {/* Age Selector */}
                <div className="flex items-center justify-center gap-3 mt-3 mb-6">
                  <span className="text-sm font-medium text-gray-200">Select age:</span>
                  <div className="flex gap-1">
                    {ages.map((age) => (
                      <div
                        key={age}
                        onClick={() => setSelectedAge(age)}
                        className={`h-8 w-8 p-0 text-sm font-medium transition-all rounded-lg flex justify-center items-center cursor-pointer ${
                          selectedAge === age
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-gray-200 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {age}
                      </div>
                    ))}
                  </div>
              </div>
                
              </div>
            </header>
  )
}