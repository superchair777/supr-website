export interface PromotionSlide {
  id: string;
  title: string;
  desc: string;
  cta: string;
  image?: string; // URL for the image
}

const STORAGE_KEY = 'supr_promotion_slides';

const defaultSlides: PromotionSlide[] = [
  {
    id: '1',
    title: 'Promotions available now',
    desc: 'Discover limited-time deals on our best-selling chairs.',
    cta: 'View promotions',
  },
  {
    id: '2',
    title: 'New Products',
    desc: 'Explore our latest ergonomic innovations and premium models.',
    cta: 'View new arrivals',
  },
  {
    id: '3',
    title: 'Company Announcements',
    desc: 'Get the latest updates and news from SUPR Factory.',
    cta: 'Read announcements',
  },
];

// Helper to get slides from local storage
const getLocalSlides = (): PromotionSlide[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse promotion slides', e);
    }
  }
  return defaultSlides;
};

export const fetchPromotions = async (): Promise<PromotionSlide[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getLocalSlides();
};

export const savePromotion = async (slide: PromotionSlide): Promise<PromotionSlide> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const slides = getLocalSlides();
  const index = slides.findIndex(s => s.id === slide.id);
  
  if (index >= 0) {
    slides[index] = slide;
  } else {
    // Generate a new ID if not present or just push if it has one (though usually new ones won't have a valid existing ID)
    if (!slide.id) {
      slide.id = Date.now().toString();
    }
    slides.push(slide);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
  return slide;
};

export const deletePromotion = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const slides = getLocalSlides().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
};
