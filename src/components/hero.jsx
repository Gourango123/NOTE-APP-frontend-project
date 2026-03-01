import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-[#f0f9f4] py-10 px-6 flex flex-col items-center text-center">
      {/* Badge: New Feature */}
      <div className="flex items-center gap-2 bg-white border border-green-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
        <Sparkles className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-800">
          New: AI-powered note organization
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="max-w-4xl text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
        <span className="text-green-600">Your thoughts, organized and accessible</span>
        <br />
        <span className="text-[#1a2d21]">everywhere</span>
      </h1>

      {/* Description Text */}
      <p className="max-w-2xl text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
        Capture ideas, organize thoughts, and collaborate seamlessly. The modern 
        note-taking app that grows with you and keeps your ideas secure in the cloud.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <button className="flex items-center gap-2 bg-[#00a84d] hover:bg-[#008f41] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95">
          Start Taking Notes <ArrowRight size={20} />
        </button>
        
        <button className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-all active:scale-95">
          Watch Demo
        </button>
      </div>

      {/* Footer Features */}
      <div className="text-green-800 font-medium text-sm flex gap-2 md:gap-4 opacity-80">
        <span>Free forever</span>
        <span>•</span>
        <span>No credit card required</span>
        <span>•</span>
        <span>2 minutes setup</span>
      </div>
    </section>
  );
};

export default HeroSection;