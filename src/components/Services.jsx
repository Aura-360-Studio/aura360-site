import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.08,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const services = [
  {
    slug: 'ai-powered-ads',
    title: 'AI-Powered Ads',
    positioning: 'Creativity amplified by intelligence.',
    text: `We combine data-driven insights with high-impact visuals to craft adaptive campaigns that reach the right audience at the right moment.
Smarter targeting. Sharper execution. Measurable performance.`,
    cta: 'Explore AI Advertising',
    href: '/services/ai-powered-ads',
    featured: true,
  },
  {
    slug: 'product-photography',
    title: 'Product Photography',
    positioning: 'Precision. Presence. Performance.',
    text: `We craft product imagery that does more than showcase - it sells.
Through controlled lighting, refined composition, and meticulous detail, we position your products to command attention and drive conversion.
Every frame is designed to elevate perceived value and strengthen brand authority.`,
    cta: 'Explore Product Photography',
    href: '/services/product-photography',
  },
  {
    slug: '360-photography',
    title: '360 Photography',
    positioning: 'Immersion builds trust.',
    text: `We create interactive 360 visuals that allow customers to explore with confidence.
By revealing every angle and detail, we reduce hesitation and increase engagement across digital platforms.
Designed for brands that want transparency, depth, and distinction.`,
    cta: 'Explore 360 Photography',
    href: 'https://gothru.co/port/oszrazlAsS',
    featured: true,
    external: true,
  },
  {
    slug: 'visual-experience',
    title: 'Walkthrough and Visual Experience',
    positioning: 'Movement with purpose.',
    text: `We produce cinematic walkthroughs that transform environments into compelling visual narratives.
From real estate to experiential spaces, we design motion-led storytelling that captivates and converts.
Built to communicate scale, atmosphere, and impact.`,
    cta: 'Explore Visual Experiences',
    href: '/services/visual-experiences',
  },
];

export default function Services() {
  return (
    <motion.section
      id='services'
      className='section services-section'
      variants={sectionReveal}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className='container services-panel'>
        <motion.div className='services-shell glass section-panel' variants={staggerContainer}>
          <motion.h2 variants={itemReveal}>Services</motion.h2>
          <motion.div className='services-grid' variants={staggerContainer}>
            {services.map((service) => (
              <motion.article
                key={service.title}
                id={service.slug}
                className={`service-card glass ${service.featured ? 'service-card-featured' : ''}`}
                variants={itemReveal}
              >
                <h3>{service.title}</h3>
                <p className='service-positioning'>{service.positioning}</p>
                <p>{service.text}</p>
                {service.external ? (
                  <a href={service.href} className='service-card-cta' target='_blank' rel='noreferrer'>
                    <span>{service.cta}</span>
                    <span className='service-cta-arrow' aria-hidden='true'>
                      -&gt;
                    </span>
                  </a>
                ) : service.slug === 'product-photography' ? (
                  <Link to='/services/product-photography?mode=classic' className='service-card-cta'>
                    <span>{service.cta}</span>
                    <span className='service-cta-arrow' aria-hidden='true'>
                      -&gt;
                    </span>
                  </Link>
                ) : service.slug === 'ai-powered-ads' ? (
                  <Link to='/services/ai-powered-ads?mode=classic' className='service-card-cta'>
                    <span>{service.cta}</span>
                    <span className='service-cta-arrow' aria-hidden='true'>
                      -&gt;
                    </span>
                  </Link>
                 ) : service.slug === 'visual-experience' ? (
                  <Link to='/services/visual-experiences?mode=classic' className='service-card-cta'>
                    <span>{service.cta}</span>
                    <span className='service-cta-arrow' aria-hidden='true'>
                      -&gt;
                    </span>
                  </Link>
                ) : (
                  <a href={service.href} className='service-card-cta'>
                    <span>{service.cta}</span>
                    <span className='service-cta-arrow' aria-hidden='true'>
                      -&gt;
                    </span>
                  </a>
                )}
              </motion.article>
            ))}
          </motion.div>
          <motion.div className='services-footer-cta' variants={itemReveal}>
            <p>Ready to elevate your brand experience?</p>
            <a href='#contact' className='btn-accent-glow'>
              Start Your Project
              <span className='chip-pill'>GO</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
