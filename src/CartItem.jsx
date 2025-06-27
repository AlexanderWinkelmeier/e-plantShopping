// CartItem.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// GEÄNDERT: Payload für removeItem ist nur der Name des Items, nicht ein Objekt
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

// HINWEIS: Diese Komponente stellt den gesamten Warenkorb dar, nicht nur ein einzelnes Item.
// Ein besserer Name wäre vielleicht `ShoppingCart.jsx`.
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // GEÄNDERT: Berechnung funktioniert jetzt direkt mit Zahlen
  const calculateTotalAmount = () => {
    // `item.cost` ist bereits eine Zahl, kein String
    return cart
      .reduce((total, item) => total + item.quantity * item.cost, 0)
      .toFixed(2);
  };

  // GEÄNDERT: Berechnung funktioniert jetzt direkt mit Zahlen
  const calculateTotalCost = (item) => {
    // `item.cost` ist bereits eine Zahl
    return (item.quantity * item.cost).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      // GEÄNDERT: Payload ist jetzt der Name (String), nicht das Objekt
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // GEÄNDERT: Payload ist jetzt der Name (String), nicht das Objekt
    dispatch(removeItem(item.name));
  };

  // ... (der Rest deines Codes ab hier ist in Ordnung)
  // ...

  // Beispielhaft die korrigierte Render-Logik:
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              {/* GEÄNDERT: Stellt sicher, dass der Preis korrekt formatiert wird */}
              <div className="cart-item-cost">${item.cost.toFixed(2)}</div>
              <div className="cart-item-quantity">{/* ... Buttons ... */}</div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* ... continue shopping buttons ... */}
    </div>
  );
};

export default CartItem;
