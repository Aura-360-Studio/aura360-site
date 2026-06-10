import { useEffect, useRef, useState } from 'react';
import ServiceProcess from '../components/services/ServiceProcess';
import BeforeAfterSlider from '../components/services/BeforeAfterSlider';
import MasonryGallery from '../components/services/MasonryGallery';
import ServiceCTA from '../components/services/ServiceCTA';
import useShowcaseFloatingCard from '../hooks/useShowcaseFloatingCard';
import '../styles/VisualExperiences.scss';

// Import local assets
import beforeImage from '../assets/Visual Experiences/VE-before.png';
import afterImage from '../assets/Visual Experiences/VE-after.png';
import serviceHighlightImage from '../assets/Visual Experiences/Service Highlight.png';
import visualExperiencesHero from '../assets/Aura 360 Studio BG.webp'; // Simple website background image for hero

// Import placeholders from other pages on the website
import galleryImg1 from '../assets/Visual Experiences/gallery/VE-gallery1.png';
import galleryImg2 from '../assets/Visual Experiences/gallery/VE-gallery2.png';
import galleryImg3 from '../assets/Visual Experiences/gallery/VE-gallery3.png';
import galleryImg4 from '../assets/Visual Experiences/gallery/VE-gallery4.png';

import ppModel from '../assets/Product Photography/gallery/Model.webp';
import ppEnergy from '../assets/Product Photography/gallery/energy drink.webp';
import ppCreative from '../assets/Product Photography/gallery/creative.webp';
import ppBag from '../assets/Product Photography/gallery/my bag.webp';
import ppVodka from '../assets/Product Photography/gallery/Aurora vodka.webp';
import ppToy from '../assets/Product Photography/gallery/toy 1.webp';

import aiMango from '../assets/Ads Now Powered with AI/gallery ai/chill mango.webp';
import aiPizza from '../assets/Ads Now Powered with AI/gallery ai/pizza.webp';
import aiWatch from '../assets/Ads Now Powered with AI/gallery ai/watch.webp';
import aiSunny from '../assets/Ads Now Powered with AI/gallery ai/sunny side up.webp';
import aiMovie from '../assets/Ads Now Powered with AI/gallery ai/HADET Movie poster.webp';
import aiYoga from '../assets/Ads Now Powered with AI/gallery ai/yoga.webp';

import vpHeroImage from '../assets/Visual Experiences/VP hero.webp';
import visualExperiencesVideo from '../assets/Visual Experiences/Models.mp4';

const processSteps = [
  {
    title: 'Concept & Storyboarding',
    copy: 'We plan the flow, key visual hooks, camera angles, and pacing tailored to showcase your product or space.',
    icon: 'draw',
  },
  {
    title: 'Asset Prep & Scene Setup',
    copy: 'We set up high-resolution product models, space designs, custom lighting rigs, and environmental details.',
    icon: 'layers',
  },
  {
    title: 'Cinematic Camera & AI Motion',
    copy: 'We animate sweeping camera paths, set up motion physics, and use generative AI to expand visual options.',
    icon: 'movie',
  },
  {
    title: 'Ray-Traced Rendering',
    copy: 'We render cinematic video files at 4K resolution with physically accurate reflections and details.',
    icon: 'speed',
  },
  {
    title: 'Color Grading & Sound',
    copy: 'We enhance colors, apply atmospheric grading, and mix sound design to make the ad/walkthrough engaging.',
    icon: 'auto_awesome',
  },
  {
    title: 'Final Video Delivery',
    copy: 'We export high-quality vertical (9:16) and widescreen (16:9) video files optimized for ads and websites.',
    icon: 'check_circle',
  },
];

const galleryImages = [
  { src: galleryImg1, alt: 'Luxury villa interior walkthrough render', caption: 'Residential Walkthrough', ratioClass: 'is-portrait-hero' },
  { src: galleryImg2, alt: 'Premium commercial hotel lobby render', caption: 'Commercial Lobby', ratioClass: 'is-landscape-wide' },
  { src: galleryImg3, alt: 'Modern glass villa exterior render at twilight', caption: 'Villa Twilight Exterior', ratioClass: 'is-portrait-hero' },
  { src: galleryImg4, alt: 'Futuristic exhibition hall render', caption: 'Museum Exhibition', ratioClass: 'is-landscape-wide' },
  
  { src: ppEnergy, alt: 'Landscape energy drink commercial placeholder', caption: 'Product Commercial', ratioClass: 'is-landscape-wide' },
  { src: ppModel, alt: 'Vertical fashion product video placeholder', caption: 'Fashion Showcase', ratioClass: 'is-portrait-hero' },
  { src: ppBag, alt: 'Landscape bag showcase placeholder', caption: 'Product Featurette', ratioClass: 'is-landscape-wide' },
  { src: ppCreative, alt: 'Creative vertical product ad placeholder', caption: 'Creative Concept', ratioClass: 'is-portrait-hero' },
  
  { src: aiMango, alt: 'Vertical chill mango dynamic ad placeholder', caption: 'Vertical Ad Campaign', ratioClass: 'is-portrait-hero' },
  { src: aiPizza, alt: 'Landscape pizza cinematic promo placeholder', caption: 'Restaurant Promotion', ratioClass: 'is-landscape-wide' },
  { src: aiWatch, alt: 'Vertical watch commercial promo placeholder', caption: 'Luxury Product Ad', ratioClass: 'is-portrait-hero' },
  { src: aiSunny, alt: 'Landscape sunny side ad spot placeholder', caption: 'Widescreen Campaign', ratioClass: 'is-landscape-wide' },
  
  { src: ppToy, alt: 'Landscape toy commercial rendering placeholder', caption: 'Product Detailer', ratioClass: 'is-landscape-wide' },
  { src: ppVodka, alt: 'Vertical vodka bottle render walkthrough placeholder', caption: 'Bottle Walkthrough', ratioClass: 'is-portrait-hero' },
  { src: aiYoga, alt: 'Landscape resort lounge walkthrough placeholder', caption: 'Resort Walkthrough', ratioClass: 'is-landscape-wide' },
  { src: aiMovie, alt: 'Vertical cinema cinematic poster promo placeholder', caption: 'Cinematic Spot', ratioClass: 'is-portrait-hero' },
];

function SeamlessLoopVideo({ src, poster, className }) {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1); // 1 or 2
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    // Set up manual cross-fade transition near the end of video duration
    const crossFadeDuration = 1.0; 

    const handleTimeUpdate1 = () => {
      const duration = v1.duration;
      if (!duration || activeVideo !== 1) return;
      
      if (v1.currentTime >= duration - crossFadeDuration) {
        v2.currentTime = 0;
        v2.play().catch(() => {});
        setActiveVideo(2);
        setOpacity1(0);
        setOpacity2(1);
      }
    };

    const handleTimeUpdate2 = () => {
      const duration = v2.duration;
      if (!duration || activeVideo !== 2) return;

      if (v2.currentTime >= duration - crossFadeDuration) {
        v1.currentTime = 0;
        v1.play().catch(() => {});
        setActiveVideo(1);
        setOpacity1(1);
        setOpacity2(0);
      }
    };

    v1.addEventListener('timeupdate', handleTimeUpdate1);
    v2.addEventListener('timeupdate', handleTimeUpdate2);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate1);
      v2.removeEventListener('timeupdate', handleTimeUpdate2);
    };
  }, [activeVideo]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} className={className}>
      <video
        ref={videoRef1}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: opacity1,
          transition: 'opacity 1s ease-in-out',
          zIndex: activeVideo === 1 ? 2 : 1,
        }}
      />
      <video
        ref={videoRef2}
        src={src}
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: opacity2,
          transition: 'opacity 1s ease-in-out',
          zIndex: activeVideo === 2 ? 2 : 1,
        }}
      />
    </div>
  );
}

export default function VisualExperiences() {
  const isFloatingCardHidden = useShowcaseFloatingCard();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const scrollToGallery = (event) => {
    event.preventDefault();
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;

    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className='service-page service-page-showcase visual-experiences-page'>
      <aside
        className={`showcase-buy-panel showcase-service-panel showcase-floating-card ${
          isFloatingCardHidden ? 'showcase-floating-card-hidden' : ''
        } service-page-floating-card`}
      >
        <p className='showcase-mini-label'>Service Highlight</p>
        <div className='showcase-service-heading'>
          <div>
            <h1>Visual Experiences</h1>
            <p className='showcase-buy-copy'>
              We transform static product images into high-impact video ads. We also produce cinematic walkthroughs for workspaces, architecture, and resorts—designed to showcase and market your brand.
            </p>
          </div>
        </div>

        <a href='#gallery' className='showcase-buy-cta showcase-service-cta' onClick={scrollToGallery}>
          Explore Visual Experiences
        </a>
      </aside>

      <section id='home' className='showcase-product-shell showcase-anchor-section service-page-showcase-hero'>
        <div className='showcase-gallery-column showcase-floating-stage'>
          <div className='showcase-main-visual showcase-service-visual'>
            <SeamlessLoopVideo 
              src={visualExperiencesVideo} 
              poster={vpHeroImage}
              className='showcase-main-product-image' 
            />
          </div>
        </div>
      </section>

      <ServiceProcess
        id='process'
        title='Our Creative Process'
        intro='We shoot products and apply creative AI tools to build stunning video ads. We also design cinematic walkthroughs for architecture, interiors, and commercial spaces. Our structured workflow ensures high-fidelity results for every campaign.'
        steps={processSteps}
      />

      <BeforeAfterSlider
        id='before-after'
        title='From Concept to Cinematic Reality'
        copy='See the transformation from a raw product shot or wireframe model to a fully rendered, production-ready cinematic video ad or architectural walkthrough.'
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel='Raw Shot / Model'
        afterLabel='Final Render'
      />

      <MasonryGallery
        id='gallery'
        title='Visual Experiences Gallery'
        copy='Explore our collection of high-converting product videos, commercial ads, workspace tours, and premium interior/exterior visual walkthroughs (in both 9:16 vertical and 16:9 widescreen formats).'
        images={galleryImages}
      />

      <ServiceCTA
        id='contact'
        title="Let's Build Your Visual Experience"
        copy="We help businesses and brands transform products and environments into captivating cinematic videos and AI-powered advertisements. Let's discuss your requirements and bring your project to life."
        buttonLabel="Let's Discuss"
        buttonHref='/#contact'
      />
    </main>
  );
}
