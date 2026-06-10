import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShowcasePanoramaViewer from './ShowcasePanoramaViewer';
import ShowcaseResponsiveVideo from './ShowcaseResponsiveVideo';
import { showcaseCardReveal, showcaseHighlights, showcaseMediaBands } from './showcaseContent';

export default function ShowcaseFeatures() {
  return (
    <section id='services' className='showcase-feature-sections showcase-anchor-section'>
      {showcaseHighlights.map((item, index) => (
        <motion.article
          key={item.title}
          id={item.id}
          className={`showcase-feature-section ${index % 2 === 1 ? 'reverse' : ''}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <motion.div
            className='showcase-feature-text'
            variants={showcaseCardReveal}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: false, amount: 0.35 }}
          >
            <p className='showcase-mini-label'>{item.eyebrow}</p>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            {index === 0 ? (
              <Link to='/services/product-photography?mode=showcase' className='showcase-buy-cta showcase-feature-cta'>
                Explore Product Photography
              </Link>
            ) : null}
            {index === 1 ? (
              <Link to='/services/ai-powered-ads?mode=showcase' className='showcase-buy-cta showcase-feature-cta'>
                Explore AI Advertising
              </Link>
            ) : null}
          </motion.div>
          <div className='showcase-feature-image-wrap'>
            <img src={item.image} alt={item.eyebrow} className='showcase-feature-image' />
          </div>
        </motion.article>
      ))}

      {showcaseMediaBands.map((item, index) => (
        <motion.article
          key={item.title}
          id={item.id}
          className={`showcase-media-panel ${index === 0 ? 'showcase-media-panel-demo' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.04 }}
        >
          {item.video ? (
            <ShowcaseResponsiveVideo
              className='showcase-media-image'
              desktopSrc={item.video}
              mobileSrc={item.mobileVideo}
              ariaLabel={item.title}
              seamlessLoop={item.seamlessLoop}
            />
          ) : item.panorama ? (
            <ShowcasePanoramaViewer
              panorama={item.panorama}
              ariaLabel='Interactive 360 panorama of an interior space for 360 photography'
            />
          ) : (
            <img src={item.image} alt={item.title} className='showcase-media-image' />
          )}
          <motion.div
            className={`showcase-media-overlay ${item.video && !item.card ? 'showcase-media-overlay-right' : ''} ${
              index === 2 ? 'showcase-media-overlay-top-right' : ''
            } ${item.card ? 'showcase-media-overlay-card' : 'showcase-media-overlay-label'}`}
            variants={item.card ? showcaseCardReveal : undefined}
            initial={item.card ? 'hidden' : false}
            whileInView={item.card ? 'visible' : undefined}
            viewport={item.card ? { once: false, amount: 0.35 } : undefined}
          >
            {item.card ? (
              <div
                className={`showcase-media-card ${index === 2 ? 'showcase-media-card-compact' : ''}`}
              >
                <p className='showcase-mini-label'>{item.card.eyebrow}</p>
                <h3>{item.card.title}</h3>
                <p>{item.card.copy}</p>
                {item.card.ctaHref.startsWith('/') ? (
                  <Link to={item.card.ctaHref} className='showcase-buy-cta showcase-feature-cta'>
                    {item.card.ctaLabel}
                  </Link>
                ) : (
                  <a href={item.card.ctaHref} className='showcase-buy-cta showcase-feature-cta'>
                    {item.card.ctaLabel}
                  </a>
                )}
              </div>
            ) : (
              <span>{item.title}</span>
            )}
          </motion.div>
        </motion.article>
      ))}
    </section>
  );
}
