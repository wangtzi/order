import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import LandingPage from './components/Pages/LandingPage';
import MenuPage from './components/Pages/MenuPage';
import { CartProvider } from './components/Cart/CartContext';

function App() {
  const [view, setView] = useState('landing');

  const handleStartOrder = () => {
    setView('menu');
  };

  return (
    <CartProvider>
      <MainLayout>
        {view === 'landing' ? (
          <LandingPage onStartOrder={handleStartOrder} />
        ) : (
          <MenuPage />
        )}
      </MainLayout>
    </CartProvider>
  );
}

export default App;
