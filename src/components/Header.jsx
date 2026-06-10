import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../assets/logo-white.png';
import faviconLens from '../assets/favicon_io/favicon-32x32.png';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'additional', label: 'Scope' },
  { id: 'contact', label: 'Contact' },
];

const labsIconLine =
  'https://cdn.jsdelivr.net/npm/remixicon@4.9.1/icons/Health%20%26%20Medical/flask-line.svg';
const labsIconFill =
  'https://cdn.jsdelivr.net/npm/remixicon@4.9.1/icons/Health%20%26%20Medical/flask-fill.svg';
const labsUrl = 'https://labs.aura360studio.com/';
const showcaseMenuItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'additional', label: 'Scope', href: '#additional' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
const serviceSequence = [
  { slug: 'product-photography', label: 'Product Photography', path: '/services/product-photography' },
  { slug: 'ai-powered-ads', label: 'Ads, now AI-powered', path: '/services/ai-powered-ads' },
  { slug: 'visual-experiences', label: 'Visual Experiences', path: '/services/visual-experiences' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLabsPage = location.pathname === '/labs';
  const isShowcasePage = location.pathname === '/';
  const isServicePage = location.pathname.startsWith('/services/');
  const isShowcaseHeaderPage = isShowcasePage || isServicePage;
  const sourceMode = searchParams.get('mode') === 'classic' ? 'classic' : 'showcase';
  const currentServiceSlug = location.pathname.replace('/services/', '') || 'product-photography';
  const servicePageLabel =
    location.pathname === '/services/product-photography'
      ? 'Product Photography'
      : location.pathname === '/services/ai-powered-ads'
      ? 'Ads, now AI-powered'
      : location.pathname === '/services/visual-experiences'
      ? 'Visual Experiences'
      : 'Service Page';
  const currentServiceIndex = serviceSequence.findIndex((item) => item.slug === currentServiceSlug);
  const safeServiceIndex = currentServiceIndex >= 0 ? currentServiceIndex : 0;
  const previousService = serviceSequence.length
    ? serviceSequence[(safeServiceIndex - 1 + serviceSequence.length) % serviceSequence.length]
    : null;
  const nextService = serviceSequence.length
    ? serviceSequence[(safeServiceIndex + 1) % serviceSequence.length]
    : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [isShowcaseHeaderHidden, setIsShowcaseHeaderHidden] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hashId = window.location.hash.replace('#', '');
      if (hashId) setActiveId(hashId);
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);

    const sectionEls = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { threshold: [0.3, 0.55, 0.75] }
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isShowcaseHeaderPage) {
      setIsShowcaseHeaderHidden(false);
      return undefined;
    }

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) < 8) return;

      if (currentScrollY <= 24 || isMenuOpen || delta < 0) {
        setIsShowcaseHeaderHidden(false);
      } else if (delta > 0) {
        setIsShowcaseHeaderHidden(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen, isShowcaseHeaderPage]);


  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const buildModeHref = (mode, hash = '#home') => (mode === 'classic' ? `/classic${hash}` : `/${hash}`);
  const buildServiceDestination = (service) => {
    if (!service) return '#';
    if (service.path) {
      return `${service.path}?mode=${sourceMode}`;
    }

    return buildModeHref(sourceMode, service.anchor || '#services');
  };

  const handleServiceHomeClick = (event) => {
    event.preventDefault();
    navigate(buildModeHref(sourceMode, '#home'));
  };


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }

    return false;
  };

  const handleClassicHomeClick = (event) => {
    event.preventDefault();
    handleNavClick();
    setActiveId('home');

    if (location.pathname === '/classic' && scrollToSection('home')) {
      window.history.replaceState(null, '', '/classic#home');
      return;
    }

    navigate('/classic#home');
    window.setTimeout(() => {
      scrollToSection('home');
    }, 60);
  };

  const handleShowcaseHomeClick = (event) => {
    event.preventDefault();
    handleNavClick();
    setActiveId('home');

    if (location.pathname === '/' && scrollToSection('home')) {
      window.history.replaceState(null, '', '/#home');
      return;
    }

    navigate('/#home');
    window.setTimeout(() => {
      scrollToSection('home');
    }, 60);
  };

  return (
    <header className={`header-layer ${isShowcaseHeaderPage && isShowcaseHeaderHidden ? 'showcase-header-hidden' : ''}`}>
      {isServicePage ? (
        <div className='service-header-bar'>
          <div className='service-header-shell'>
            <Link
              to={buildModeHref(sourceMode, '#home')}
              className='service-header-close'
              aria-label={`Close and return to ${sourceMode} mode`}
              onClick={handleServiceHomeClick}
            >
              <span className='showcase-close-mark' aria-hidden='true'>
                <span />
                <span />
              </span>
            </Link>

            <Link to={buildModeHref(sourceMode, '#home')} className='service-header-title' onClick={handleServiceHomeClick}>
              {servicePageLabel}
            </Link>

            <div className='service-header-pager' aria-label='Service navigation'>
              <Link
                to={buildServiceDestination(previousService)}
                className={`service-header-nav ${previousService ? '' : 'is-disabled'}`}
                aria-disabled={previousService ? undefined : 'true'}
                tabIndex={previousService ? undefined : -1}
              >
                <span aria-hidden='true'>←</span>
              </Link>
              <Link
                to={buildServiceDestination(nextService)}
                className={`service-header-nav ${nextService ? '' : 'is-disabled'}`}
                aria-disabled={nextService ? undefined : 'true'}
                tabIndex={nextService ? undefined : -1}
              >
                <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : isShowcaseHeaderPage ? (
        <>
          <div
            id='showcase-menu-panel'
            className={`showcase-menu-panel ${isMenuOpen ? 'open' : ''} ${isShowcaseHeaderHidden && !isMenuOpen ? 'hidden' : ''}`}
            aria-hidden='false'
          >
            <div className='showcase-menu-card'>
              <div className='showcase-menu-top'>
                <button
                  type='button'
                  className={`showcase-menu-toggle ${isMenuOpen ? 'open' : ''}`}
                  aria-label={isMenuOpen ? 'Close showcase menu' : 'Open showcase menu'}
                  aria-expanded={isMenuOpen}
                  aria-controls='showcase-menu-panel'
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  {isMenuOpen ? (
                    <span className='showcase-close-mark' aria-hidden='true'>
                      <span />
                      <span />  
                    </span>
                  ) : (
                    <span className='showcase-menu-glyph' aria-hidden='true'>
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </button>

                <Link to='/#home' className='showcase-wordmark showcase-wordmark-static' onClick={handleNavClick}>
                  <span>Aura 360 Studio</span>
                </Link>

                <Link
                  to='/#home'
                  className='showcase-brand-mark'
                  aria-label='Go to Aura 360 Studio showcase home'
                  onClick={handleNavClick}
                >
                  <img src={faviconLens} alt='' className='showcase-brand-mark-image' />
                </Link>
              </div>

              <nav className='showcase-menu-nav' aria-label='Showcase navigation'>
                {showcaseMenuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className='showcase-menu-link'
                    onClick={() => {
                      setActiveId(item.id);
                      handleNavClick();
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className='showcase-menu-actions' aria-label='Showcase quick actions'>
                <Link to='/classic' className='showcase-menu-action' onClick={handleNavClick}>
                  Classic Mode
                </Link>
                <a href={labsUrl} className='showcase-menu-action' onClick={handleNavClick} target='_blank' rel='noreferrer'>
                  Aura Lab
                </a>
              </div>
            </div>
          </div>

          <Link
            to='/classic'
            title='Classic Mode'
            aria-label='Classic Mode'
            className='mode-switch is-showcase-page showcase-side-control'
          >
            <span className='mode-switch-icon' aria-hidden='true'>
              <svg className='mode-icon mode-icon-outline' viewBox='0 0 24 24' role='presentation' focusable='false'>
                <rect x='3.5' y='4.5' width='7' height='7' rx='1.5' />
                <rect x='13.5' y='4.5' width='7' height='7' rx='1.5' />
                <rect x='3.5' y='14.5' width='7' height='7' rx='1.5' />
                <rect x='13.5' y='14.5' width='7' height='7' rx='1.5' />
              </svg>
              <svg className='mode-icon mode-icon-fill' viewBox='0 0 24 24' role='presentation' focusable='false'>
                <rect x='3' y='4' width='8' height='8' rx='2' />
                <rect x='13' y='4' width='8' height='8' rx='2' />
                <rect x='3' y='14' width='8' height='8' rx='2' />
                <rect x='13' y='14' width='8' height='8' rx='2' />
              </svg>
            </span>
          </Link>

          <a
            href={labsUrl}
            title='Aura Labs'
            aria-label='Aura Labs'
            className='labs-launch showcase-side-control'
            target='_blank'
            rel='noreferrer'
          >
            <span
              className='labs-launch-icon'
              aria-hidden='true'
              style={{
                '--labs-icon-line': `url("${labsIconLine}")`,
                '--labs-icon-fill': `url("${labsIconFill}")`,
              }}
            />
          </a>
        </>
      ) : (
        <>
      <Link to='/#home' aria-label='Aura 360 Studio Home' className='logo-dock glass' onClick={handleClassicHomeClick}>
        <img src={logoWhite} alt='Aura 360 Studio' className='logo-dock-image' />
      </Link>

      {!isLabsPage && !isShowcasePage && !isServicePage ? (
        <nav className='nav-pill glass' aria-label='Primary navigation'>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveId(item.id);
                handleNavClick();
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : isLabsPage ? (
        <nav className='nav-pill glass nav-pill-secondary' aria-label='Page navigation'>
          <Link to='/' className='nav-link'>
            Back to Showcase
          </Link>
          <span className='nav-link active'>Aura Labs</span>
        </nav>
      ) : isShowcasePage ? (
        <nav className='nav-pill glass nav-pill-secondary' aria-label='Page navigation'>
          <Link to='/classic' className='nav-link'>
            Back to Classic Site
          </Link>
          <span className='nav-link active'>Mode 02</span>
        </nav>
      ) : (
        <nav className='nav-pill glass nav-pill-secondary' aria-label='Page navigation'>
          <Link to='/' className='nav-link'>
            Back to Showcase
          </Link>
          <span className='nav-link active'>{servicePageLabel}</span>
        </nav>
      )}

      <Link
        to={isShowcasePage ? '/classic' : '/'}
        title={isShowcasePage ? 'Classic Mode' : 'Showcase Mode'}
        aria-label={isShowcasePage ? 'Classic Mode' : 'Showcase Mode'}
        className={`mode-switch ${isShowcasePage ? 'is-showcase-page' : ''}`}
      >
        <span className='mode-switch-icon' aria-hidden='true'>
          <svg className='mode-icon mode-icon-outline' viewBox='0 0 24 24' role='presentation' focusable='false'>
            <rect x='3.5' y='4.5' width='7' height='7' rx='1.5' />
            <rect x='13.5' y='4.5' width='7' height='7' rx='1.5' />
            <rect x='3.5' y='14.5' width='7' height='7' rx='1.5' />
            <rect x='13.5' y='14.5' width='7' height='7' rx='1.5' />
          </svg>
          <svg className='mode-icon mode-icon-fill' viewBox='0 0 24 24' role='presentation' focusable='false'>
            <rect x='3' y='4' width='8' height='8' rx='2' />
            <rect x='13' y='4' width='8' height='8' rx='2' />
            <rect x='3' y='14' width='8' height='8' rx='2' />
            <rect x='13' y='14' width='8' height='8' rx='2' />
          </svg>
        </span>
      </Link>

      <a
        href={labsUrl}
        title='Aura Labs'
        aria-label='Aura Labs'
        className={`labs-launch ${isLabsPage ? 'is-labs-page' : ''}`}
        target='_blank'
        rel='noreferrer'
      >
        <span
          className='labs-launch-icon'
          aria-hidden='true'
          style={{
            '--labs-icon-line': `url("${labsIconLine}")`,
            '--labs-icon-fill': `url("${labsIconFill}")`,
          }}
        />
      </a>

      <button
        type='button'
        className='menu-toggle glass'
        aria-label='Toggle navigation menu'
        aria-expanded={isMenuOpen}
        aria-controls='mobile-nav-dropdown'
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={`menu-bar ${isMenuOpen ? 'open' : ''}`} />
        <span className={`menu-bar ${isMenuOpen ? 'open' : ''}`} />
        <span className={`menu-bar ${isMenuOpen ? 'open' : ''}`} />
      </button>

      <nav
        id='mobile-nav-dropdown'
        className={`mobile-menu glass ${isMenuOpen ? 'open' : ''}`}
        aria-label='Mobile navigation'
      >
        {isLabsPage || isShowcasePage || isServicePage ? (
          <>
            <Link
              to={isShowcasePage ? '/classic' : '/'}
              className={`mobile-nav-link ${isShowcasePage ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Website Mode
            </Link>
            <a href={labsUrl} className='mobile-nav-link' onClick={handleNavClick} target='_blank' rel='noreferrer'>
              Aura Labs
            </a>
          </>
        ) : null}
        {isLabsPage || isShowcasePage || isServicePage ? (
          <Link to='/' className='mobile-nav-link' onClick={handleNavClick}>
            Back to Showcase
          </Link>
        ) : (
          navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveId(item.id);
                handleNavClick();
              }}
            >
              {item.label}
            </a>
          ))
        )}
      </nav>
        </>
      )}
    </header>
  );
}
