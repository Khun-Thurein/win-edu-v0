import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICE_ADDRESS_EN, OFFICE_ADDRESS_MY } from '../data/officeAddress';
import { FacebookIcon } from './SocialIcons';
import './Footer.css';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className={`footer ${language === 'my' ? 'footer--my' : ''}`}>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h4 className="footer__brand-title">
              <span>WIN INTERNATIONAL</span>
              <span>EDUCATION SERVICE</span>
            </h4>
            <p className="footer__tag">
              "It is also our commitment to help students settle so they feel at home."
            </p>
            <div className="footer__socials">
              <a href="https://www.facebook.com/profile.php?id=100067407050438" aria-label="Facebook" target="_blank" rel="noreferrer">
                <FacebookIcon size={28} />
              </a>
              <a href="https://www.facebook.com/messages/t/100067407050438" aria-label="Messenger" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn.simpleicons.org/messenger/0084FF"
                  alt="Messenger"
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <div className="eyebrow">Explore</div>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/success-story">Success Story</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/social">Social</Link>
          </div>

          <div className="footer__col">
            <div className="eyebrow">Reach Us</div>
            <a href="mailto:info@win-international.ca" className="footer__contact">
              <Mail size={14} /> info@win-international.ca
            </a>
            <a href="mailto:myintzu@win-international.ca" className="footer__contact">
              <Mail size={14} /> myintzu@win-international.ca
            </a>
            <div className="footer__contact footer__contact--address">
              <MapPin size={14} />
              <span className="footer__office-address">
                {language === 'my' ? OFFICE_ADDRESS_MY : OFFICE_ADDRESS_EN}
              </span>
            </div>
            <a href="tel:+959976766429" className="footer__contact">
              <Phone size={14} /> +95 9 976 766 429
            </a>
          </div>

        </div>

        <div className="footer__bot">
          <span>© {new Date().getFullYear()} WIN International Education</span>
          <span className="footer__license">
            Icons by{' '}
            <a href="https://icons8.com" target="_blank" rel="noreferrer">
              Icons8
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
