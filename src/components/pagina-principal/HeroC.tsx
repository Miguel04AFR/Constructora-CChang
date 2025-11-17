"use client";

import { useRef, useEffect, useState } from 'react';
import '../../module/moduloHeroC.css';
import { useTranslation } from 'react-i18next';


export const HeroC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [estaCargado, setEstaCargado] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.8;
      video.play().catch(error => {
        console.log("Error reproduciendo video:", error);
      });
    }
    setEstaCargado(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element !== null) {
      element.scrollIntoView({ behavior: 'smooth' });
  }
  };

  return (
    <section className="hero-section" id='heroC'>
      
      {/* Contenedor del video */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
          onLoadedData={() => setEstaCargado(true)}
        >
          <source src="/1197802-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        
        <div className="video-overlay"></div>
      </div>

      {/* Contenido */}
      <div className={`hero-content ${estaCargado ? 'loaded' : ''}`}>
        <h1 className="hero-title">
          <span>{t('hero.title')}</span>
          <span className="hero-subtitle">
            {t('hero.subtitle')}
          </span>
        </h1>

        <p className="hero-description">
          {t('hero.description')}
        </p>

        <div className="hero-buttons">
          <button 
            onClick={() => scrollToSection('contactanos')}
            className="btn-primary"
          >
            {t('hero.contact')}
          </button>
          
          <button 
            onClick={() => scrollToSection('proyectos')}
            className="btn-secondary"
          >
            {t('hero.projects')}
          </button>
        </div>
      </div>


      
    </section>
  );
};