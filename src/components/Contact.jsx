import { motion } from 'framer-motion';
import useContactForm from '../hooks/useContactForm';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: index * 0.08 },
  }),
};

export default function Contact() {
  const whatsappUrl =
    'https://wa.me/9141671120?text=Hi%20Aura%20360%20Studio%2C%20I%20want%20to%20discuss%20a%20project.';
  const { formRef, formData, errors, status, handleBlur, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.section
      id='contact'
      className='section'
      variants={sectionReveal}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className='container glass section-panel contact-panel contact-modern'>
        <div className='contact-modern-grid'>
          <motion.aside className='contact-lead-block' variants={itemReveal} custom={0}>
            <h2 className='contact-heading'>Let&apos;s Build Your Brand&apos;s Future.</h2>
            <p className='section-copy contact-subtext'>
              Tell us about your idea. Let&apos;s shape it into something unforgettable.
            </p>
            <p className='contact-microcopy'>We respond within 24 hours.</p>
          </motion.aside>

          <motion.div className='contact-form-card glass' variants={itemReveal} custom={1}>
            <form
              id='contact-form'
              ref={formRef}
              className='contact-modern-form'
              onSubmit={handleSubmit}
              noValidate
            >
              <div className='form-row'>
                <label className='form-label-modern' htmlFor='contact-name'>
                  Name <span className='required-mark'>*</span>
                </label>
                <input
                  id='contact-name'
                  name='user_name'
                  type='text'
                  className='input-field-modern'
                  placeholder='Your full name'
                  value={formData.user_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.user_name)}
                  aria-describedby={errors.user_name ? 'name-error' : undefined}
                  required
                />
                {errors.user_name ? (
                  <p id='name-error' className='form-error' role='alert'>
                    {errors.user_name}
                  </p>
                ) : null}
              </div>

              <div className='form-row'>
                <label className='form-label-modern' htmlFor='contact-email'>
                  Email <span className='required-mark'>*</span>
                </label>
                <input
                  id='contact-email'
                  name='user_email'
                  type='email'
                  className='input-field-modern'
                  placeholder='you@company.com'
                  value={formData.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.user_email)}
                  aria-describedby={errors.user_email ? 'email-error' : undefined}
                  required
                />
                {errors.user_email ? (
                  <p id='email-error' className='form-error' role='alert'>
                    {errors.user_email}
                  </p>
                ) : null}
              </div>

              <div className='form-row'>
                <label className='form-label-modern' htmlFor='project-type'>
                  Project Type
                </label>
                <select
                  id='project-type'
                  name='project_type'
                  className='input-field-modern'
                  value={formData.project_type}
                  onChange={handleChange}
                >
                  <option value='Branding'>Branding</option>
                  <option value='Web Design'>Web Design</option>
                  <option value='Marketing'>Marketing</option>
                  <option value='Other'>Other</option>
                </select>
              </div>

              <div className='form-row'>
                <label className='form-label-modern' htmlFor='contact-message'>
                  Message
                </label>
                <textarea
                  id='contact-message'
                  name='user_message'
                  rows='4'
                  className='input-field-modern textarea-modern'
                  placeholder='Briefly describe your goals, timeline, and budget...'
                  value={formData.user_message}
                  onChange={handleChange}
                />
              </div>

              <button type='submit' className='btn-accent-glow contact-submit contact-submit-btn'>
                Send Project Details
              </button>

              <p className='trust-strip'>
                <span>✔ 100% confidential</span>
                <span>✔ No spam</span>
                <span>✔ Free consultation</span>
              </p>

              {status.message ? (
                <p
                  className={status.type === 'success' ? 'form-success' : 'form-error'}
                  role='status'
                  aria-live='polite'
                >
                  {status.message}
                </p>
              ) : null}
            </form>

            <p className='whatsapp-secondary'>
              Prefer instant chat?{' '}
              <a href={whatsappUrl} target='_blank' rel='noreferrer' className='whatsapp-inline-link'>
                Message us on WhatsApp
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
