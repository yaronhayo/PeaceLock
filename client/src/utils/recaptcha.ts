// Client-side reCAPTCHA utilities
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const loadRecaptcha = () => {
  if (typeof window !== 'undefined' && !window.grecaptcha) {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};

export const executeRecaptcha = async (action: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(reject);
      });
    } else {
      reject('reCAPTCHA not loaded');
    }
  });
};