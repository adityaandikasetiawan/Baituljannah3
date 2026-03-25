import React from 'react';
import { Play } from 'lucide-react';

export function VideoProfileSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.10), transparent 40%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.08), transparent 55%)',
          }}
        />
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
            <Play className="w-4 h-4" />
            <span>Video Profil</span>
          </div>
          <h2 className="text-1xl md:text-3xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
            Mengenal Lebih Dekat Baituljannah Islamic School
          </h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-strong border border-white/10 max-w-5xl mx-auto aspect-[16/9] bg-black">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/EMSGkb_-ATI?si=hI4YsMLT7jLSRT9e&autoplay=1&mute=1&playsinline=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

