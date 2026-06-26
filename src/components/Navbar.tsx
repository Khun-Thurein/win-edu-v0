import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageFlagSwitch from './LanguageFlagSwitch';
import { pickByLanguage, useLanguage } from '../context/language';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', en: 'Home', my: '' },
  { to: '/services', en: 'Services', my: '' },
  { to: '/success-story', en: 'Success Story', my: '' },
  { to: '/contact', en: 'Contact', my: '' },
  { to: '/social', en: 'Social', my: '' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__logo" aria-label="Home">
            <Logo size={64} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav__link ${isActive ? 'nav__link--active' : ''}`
                }
              >
                {pickByLanguage(language, item.en, item.my)}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <LanguageFlagSwitch
              id="nav-lang-switch"
              className="nav__lang-switch"
              isMyanmar={language === 'my'}
              onToggle={toggleLanguage}
            />
            <Link to="/contact" className="btn btn-ghost nav__cta">
              {pickByLanguage(language, 'Book Now', '')}
            </Link>
          </div>

          <button
            className="nav__burger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`drawer-shell ${mobileOpen ? 'drawer-shell--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <button
          className="drawer__backdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
        <div className="drawer">
          <div className="drawer__head">
            <Logo size={44} variant="mark" />
            <button
              className="drawer__close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="drawer__links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `drawer__link ${isActive ? 'drawer__link--active' : ''}`
                }
              >
                <span className="drawer__num">→</span>
                {pickByLanguage(language, item.en, item.my)}
              </NavLink>
            ))}
          </nav>
          <LanguageFlagSwitch
            id="drawer-lang-switch"
            className="drawer__lang-switch"
            isMyanmar={language === 'my'}
            onToggle={toggleLanguage}
          />
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary"
            style={{ margin: '24px' }}
          >
            {pickByLanguage(language, 'Book Now', '')}
          </Link>
        </div>
      </div>
    </>
  );
}
