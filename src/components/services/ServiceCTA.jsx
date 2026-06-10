import { useLocation } from 'react-router-dom';

export default function ServiceCTA({ title, copy, buttonLabel, buttonHref }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sourceMode = searchParams.get('mode') === 'classic' ? 'classic' : 'showcase';
  const whatsappUrl =
    'https://wa.me/9141671120?text=Hi%20Aura%20360%20Studio%2C%20I%20want%20to%20discuss%20a%20project.';
  const resolvedButtonHref =
    buttonHref === '/#contact' ? (sourceMode === 'classic' ? '/classic#contact' : '/#contact') : buttonHref;

  return (
    <section className='service-page-section service-soft-cta'>
      <div className='service-soft-cta-shell service-contact-style-shell'>
        <h2>{title}</h2>
        <p className='service-contact-style-body'>{copy}</p>
        <p className='service-contact-style-support'>We respond within 24 hours.</p>

        <div className='showcase-contact-actions service-contact-style-actions'>
          <a href={resolvedButtonHref} className='showcase-contact-button showcase-contact-primary service-page-button'>
            {buttonLabel}
          </a>
        </div>

        <p className='trust-strip showcase-trust-strip service-contact-style-trust'>
          <span>100% confidential</span>
          <span>No spam</span>
          <span>Free consultation</span>
        </p>

        <p className='showcase-contact-footer service-contact-style-footer'>
          Prefer instant chat?{' '}
          <a href={whatsappUrl} target='_blank' rel='noreferrer' className='whatsapp-inline-link'>
            Message us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
