import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ShowcaseContactModal from './ShowcaseContactModal';
import { showcaseCardReveal, showcaseContactImage } from './showcaseContent';

const whatsappUrl =
  'https://wa.me/9141671120?text=Hi%20Aura%20360%20Studio%2C%20I%20want%20to%20discuss%20a%20project.';

export default function ShowcaseContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerButtonRef = useRef(null);
  const sectionRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerButtonRef.current?.focus();
  };

  const handleSuccessfulClose = () => {
    setIsModalOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    sectionRef.current?.focus();
  };

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='showcase-bottom-cta showcase-anchor-section'
      tabIndex='-1'
    >
      <div className='showcase-full-bleed-panel showcase-contact-panel'>
        <img src={showcaseContactImage} alt='Contact direction visual' className='showcase-section-image' />
        <div className='showcase-section-overlay showcase-contact-overlay'>
          <motion.div
            className='showcase-contact-shell'
            variants={showcaseCardReveal}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: false, amount: 0.35 }}
          >
            <h2>Let's Build Your Brand's Future.</h2>
            <p className='showcase-contact-body'>
              Tell us about your idea. Let's shape it into something unforgettable.
            </p>
            <p className='showcase-contact-support'>We respond within 24 hours.</p>

            <div className='showcase-contact-actions'>
              <button
                ref={triggerButtonRef}
                type='button'
                className='showcase-contact-button showcase-contact-primary'
                onClick={handleOpenModal}
              >
                Send Project Details
              </button>
            </div>

            <p className='trust-strip showcase-trust-strip'>
              <span>✔ 100% confidential</span>
              <span>✔ No spam</span>
              <span>✔ Free consultation</span>
            </p>

            <p className='showcase-modal-footer showcase-contact-footer'>
              Prefer instant chat?{' '}
              <a href={whatsappUrl} target='_blank' rel='noreferrer' className='whatsapp-inline-link'>
                Message us on WhatsApp
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>

      <ShowcaseContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccessfulClose={handleSuccessfulClose}
        whatsappUrl={whatsappUrl}
      />
    </section>
  );
}
