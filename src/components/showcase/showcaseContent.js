import firstImage from '../../assets/first image.webp';
import demoVideo from '../../assets/Demo video.mp4';
import demoVideoMobile from '../../assets/Demo Video mob.mp4';
import productImage from '../../assets/product.png';
import productFeatureImage from '../../assets/product.webp';
import aiPoweredImage from '../../assets/AI-powered.webp';
import auraStudioBg from '../../assets/Aura 360 Studio BG.webp';
import contactImage from '../../assets/contact.webp';
import skyInsidePanorama from '../../assets/3_Sky_inside_mid_view.webp';
import luxuryVodkaVideo from '../../assets/Luxury_Vodka_Ad_Generation.mp4';
import visualExperienceVideo from '../../assets/Visual_Experience.mp4';
import visualExperienceVideoMobile from '../../assets/Visual_Experience_mob.mp4';
import clientLogo1 from '../../assets/Clients logo/1 kido.webp';
import clientLogo2 from '../../assets/Clients logo/2 sky land brand.webp';
import clientLogo3 from '../../assets/Clients logo/3 bizen.webp';
import clientLogo4 from '../../assets/Clients logo/4 dd.webp';
import clientLogo5 from '../../assets/Clients logo/5 Kreedo-logo.webp';
import clientLogo6 from '../../assets/Clients logo/6 Kiya-logo.webp';
import clientLogo7 from '../../assets/Clients logo/ZORKO-LOGO.webp';
import imageC from '../../assets/showcase/Phone (3a) Lite _ Nothing _ IN_files/45ef3df666d22fdf6400cb9a8b6c927da4d7cae1-4096x2305.jpg';
import imageD from '../../assets/showcase/Phone (3a) Lite _ Nothing _ IN_files/8e20678bead91663aee2ecf82f75a59df41fdd9a-4096x2305.jpg';
import imageE from '../../assets/showcase/Phone (3a) Lite _ Nothing _ IN_files/e51eafa8c68c0f72fe5e29262ab3831ff5af9f07-4096x2305.jpg';
import imageF from '../../assets/showcase/Phone (3a) Lite _ Nothing _ IN_files/f9295f017f6a6ba6c920627d2a8887729601b6f8-4096x2305.jpg';
import scopeVideo from '../../assets/scope.mp4';
import scopeVideoMobile from '../../assets/Scopemob.mp4';

export const showcaseReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const showcaseCardReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const showcaseAssets = {
  firstImage,
  demoVideo,
  demoVideoMobile,
  productImage,
  auraStudioBg,
  scopeVideo,
  scopeVideoMobile,
  skyInsidePanorama,
};

export const serviceHighlights = ['Studio Lighting', 'High Resolution', 'Professional Retouch'];

export const showcaseClients = [
  { name: 'Kido', logo: clientLogo1 },
  { name: 'Sky Land Brand', logo: clientLogo2 },
  { name: 'Bizen', logo: clientLogo3 },
  { name: 'DD', logo: clientLogo4 },
  { name: 'Kreedo', logo: clientLogo5 },
  { name: 'Kiya', logo: clientLogo6 },
  { name: 'Zorko', logo: clientLogo7 },
];

export const showcaseHighlights = [
  {
    id: 'product-photography',
    eyebrow: 'Product Photography',
    title: 'We craft product imagery that sells.',
    copy:
      'Every frame is designed to elevate perceived value and strengthen brand authority.',
    image: productFeatureImage,
  },
  {
    id: 'ai-powered-ads',
    eyebrow: 'Ads, now AI-powered',
    title: 'We craft AI-powered ads that attract attention.',
    copy:
      'Creative powered by insight and precision. Made to increase visibility, engagement, and response.',
    image: aiPoweredImage,
  },
];

export const showcaseMediaBands = [
  { id: 'vodka-demo', title: 'Creative powered by insight and precision', video: luxuryVodkaVideo, seamlessLoop: true },
  {
    id: '360-photography',
    title: 'Secondary feature frame with room for motion or copy',
    panorama: skyInsidePanorama,
    card: {
      eyebrow: '360 Photography',
      title: 'Immersion builds trust.',
      copy: 'We create interactive 360 visuals that allow customers to explore with confidence.',
      ctaLabel: 'Explore 360 Photography',
      ctaHref: '#contact',
    },
  },
  {
    id: 'visual-experience',
    title: 'Third feature image ready for replacement content',
    video: visualExperienceVideo,
    mobileVideo: visualExperienceVideoMobile,
    card: {
      eyebrow: 'Movement with purpose.',
      title: 'Walkthrough and Visual Experience',
      copy:
        'We produce cinematic walkthroughs that transform environments into compelling visual narratives. Use this space for a headline, supporting copy, and a CTA once the third service direction is finalized.',
      ctaLabel: 'Explore Visual Experiences',
      ctaHref: '/services/visual-experiences?mode=showcase',
    },
  },
];

export const showcaseContactImage = contactImage;
