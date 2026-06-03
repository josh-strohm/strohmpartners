import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { ServiceDetail } from '@/pages/ServiceDetail';
import { BookCall } from '@/pages/BookCall';
import { Contact } from '@/pages/Contact';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { RefundPolicy } from '@/pages/RefundPolicy';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Header />
      <PageWrapper key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/what-we-build" element={<Navigate to="/services" replace />} />
          <Route path="/book" element={<BookCall />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;