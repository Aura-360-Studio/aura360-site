import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  Header,
  Hero,
  About,
  Services,
  Additional,
  Contact,
  LabsPage,
  ShowcasePage,
} from './components';
import ProductPhotography from './pages/ProductPhotography';
import AdsNowAIPowered from './pages/AdsNowAIPowered';
import VisualExperiences from './pages/VisualExperiences';
import { initSmoothScroll } from './utils/smoothScroll';

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const hashId = location.hash.replace('#', '');
    if (!hashId) return;

    const timer = window.setTimeout(() => {
      const section = document.getElementById(hashId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return null;
}

function OnePageLayout() {
  const year = new Date().getFullYear();
  const footerAddress =
    'XHV5+R8G, 5th Main Rd, Prakash Nagar, Rajajinagar, Bengaluru, Karnataka 560021';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerAddress)}`;

  useEffect(() => {
    // Next step: replace native smooth scroll with Lenis for cinematic easing.
    initSmoothScroll();
  }, []);

  return (
    <>
      <HashScrollHandler />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Additional />
        <Contact />
      </main>
      <footer className='site-footer'>
        <p>(c) {year} Aura 360 Studio. All rights reserved.</p>
        <a href={mapsUrl} target='_blank' rel='noreferrer' className='footer-address-link'>
          {footerAddress}
        </a>
      </footer>
    </>
  );
}

function LabsLayout() {
  return (
    <>
      <Header />
      <LabsPage />
    </>
  );
}

function ShowcaseLayout() {
  return (
    <>
      <HashScrollHandler />
      <Header />
      <ShowcasePage />
    </>
  );
}

function ProductPhotographyLayout() {
  return (
    <>
      <Header />
      <ProductPhotography />
    </>
  );
}

function AdsNowAIPoweredLayout() {
  return (
    <>
      <Header />
      <AdsNowAIPowered />
    </>
  );
}

function VisualExperiencesLayout() {
  return (
    <>
      <Header />
      <VisualExperiences />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<ShowcaseLayout />} />
      <Route path='/classic' element={<OnePageLayout />} />
      <Route path='/labs' element={<LabsLayout />} />
      <Route path='/showcase' element={<Navigate to='/' replace />} />
      <Route path='/services/product-photography' element={<ProductPhotographyLayout />} />
      <Route path='/services/ai-powered-ads' element={<AdsNowAIPoweredLayout />} />
      <Route path='/services/visual-experiences' element={<VisualExperiencesLayout />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
