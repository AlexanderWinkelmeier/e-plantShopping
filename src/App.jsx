import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  // Initialer State könnte aus URL-Parameter kommen (für besseres Routing in GitHub Pages)
  const [showProductList, setShowProductList] = useState(
    window.location.hash === '#products'
  );

  // Spezieller Effect für GitHub Pages Navigation
  React.useEffect(() => {
    // Hash-basiertes Routing für GitHub Pages
    const handleHashChange = () => {
      setShowProductList(window.location.hash === '#products');
    };

    // Event-Listener für Hash-Änderungen
    window.addEventListener('hashchange', handleHashChange);

    // URL aktualisieren wenn sich der State ändert
    if (showProductList) {
      window.location.hash = 'products';
    } else {
      // Wenn wir auf der Startseite sind, Hash löschen
      if (window.location.hash === '#products') {
        window.history.pushState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [showProductList]);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    window.location.hash = 'products';
  };

  const handleHomeClick = () => {
    console.log('handleHomeClick wurde aufgerufen');
    // Direktes Setzen des States
    setShowProductList(false);
    // Hash entfernen
    window.history.pushState(
      null,
      '',
      window.location.pathname + window.location.search
    );
    // Scrollen nach oben
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <div
        className="landing-page"
        style={{
          display: showProductList ? 'none' : 'block',
        }}
      >
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>

            <button
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      <div
        className="product-list-container"
        style={{
          display: showProductList ? 'block' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fff',
          overflowY: 'auto',
          zIndex: 100,
        }}
      >
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;
