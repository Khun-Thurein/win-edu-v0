import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SchoolPartnerDetail from './pages/SchoolPartnerDetail';
import Programs from './pages/Programs';
import SuccessStory from './pages/SuccessStory';
import Contact from './pages/Contact';
import Social from './pages/Social';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/partners/:slug" element={<SchoolPartnerDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/success-story" element={<SuccessStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/social" element={<Social />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
