import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieNotice.css';

const CONSENT_KEY = 'win-cookie-consent';

function hasConsent(): boolean {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-notice"
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
    >
      <p className="cookie-notice__text">
        We use cookies for preferences and embedded content on some pages.
      </p>
      <div className="cookie-notice__actions">
        <Link to="/privacy" className="cookie-notice__link">Privacy</Link>
        <button type="button" className="cookie-notice__accept" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
