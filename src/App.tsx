import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { LanguageProvider } from './context/LanguageContext';

const Services = lazy(() => import('./pages/Services'));
const SchoolPartnerDetail = lazy(() => import('./pages/SchoolPartnerDetail'));
const SuccessStory = lazy(() => import('./pages/SuccessStory'));
const Social = lazy(() => import('./pages/Social'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/services/partners/:slug"
            element={
              <LazyPage>
                <SchoolPartnerDetail />
              </LazyPage>
            }
          />
          <Route
            path="/services"
            element={
              <LazyPage>
                <Services />
              </LazyPage>
            }
          />
          <Route
            path="/success-story"
            element={
              <LazyPage>
                <SuccessStory />
              </LazyPage>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/social"
            element={
              <LazyPage>
                <Social />
              </LazyPage>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
