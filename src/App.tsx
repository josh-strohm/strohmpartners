import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Home } from '@/pages/Home';
import { WhatWeBuild } from '@/pages/WhatWeBuild';
import { Contact } from '@/pages/Contact';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { RefundPolicy } from '@/pages/RefundPolicy';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Header />
      <PageWrapper key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-build" element={<WhatWeBuild />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
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