import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetStartedClick = () => {
    setIsTransitioning(true);
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    console.log('handleHomeClick wurde aufgerufen');
    setIsTransitioning(true);
    requestAnimationFrame(() => {
      setShowProductList(false);
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 300);
    });
  };

  return (
    <div className="app-container">
      {(!showProductList || isTransitioning) && (
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
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
      )}
      {(showProductList || isTransitioning) && (
        <div
          className={`product-list-container ${
            showProductList ? 'visible' : ''
          }`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
        >
          <ProductList onHomeClick={handleHomeClick} />
        </div>
      )}
    </div>
  );
}

export default App;
