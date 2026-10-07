import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    id: 1,
    name: "Air Runner 02",
    category: "Running",
    price: 128,
    color: "Cloud / Volt",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    badge: "BEST SELLER",
    tone: "coral",
  },
  {
    id: 2,
    name: "Court Classic Low",
    category: "Lifestyle",
    price: 95,
    color: "Chalk / Forest",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85",
    badge: "",
    tone: "sage",
  },
  {
    id: 3,
    name: "Terra Trail Pro",
    category: "Trail",
    price: 145,
    color: "Stone / Ember",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=85",
    badge: "NEW",
    tone: "sand",
  },
  {
    id: 4,
    name: "Everyday Knit",
    category: "Lifestyle",
    price: 110,
    color: "Bone / Slate",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85",
    badge: "",
    tone: "blue",
  },
];

const categories = ["All shoes", "Running", "Lifestyle", "Trail"];

function BagIcon({ size = 19 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("All shoes");
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All shoes"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const cartItems = products.filter((product) => cart[product.id]);
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0,
  );

  function addToCart(product) {
    setCart((currentCart) => ({
      ...currentCart,
      [product.id]: (currentCart[product.id] || 0) + 1,
    }));
    setNotice(`${product.name} added to your bag`);
    window.clearTimeout(addToCart.noticeTimeout);
    addToCart.noticeTimeout = window.setTimeout(() => setNotice(""), 2400);
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) => {
      const quantity = currentCart[productId];
      if (quantity <= 1) {
        const nextCart = { ...currentCart };
        delete nextCart[productId];
        return nextCart;
      }
      return { ...currentCart, [productId]: quantity - 1 };
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      delete nextCart[productId];
      return nextCart;
    });
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        <span>Complimentary shipping on orders over $150</span>
        <a href="#products">Explore the collection <ArrowIcon /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Sole House home">
          sole<span>house</span><i>.</i>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="#products">Shop all</a>
          <a href="#products" onClick={() => setActiveCategory("Running")}>Running</a>
          <a href="#products" onClick={() => setActiveCategory("Lifestyle")}>Lifestyle</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="bag-link" href="#cart" aria-label={`Shopping bag, ${itemCount} items`}>
          <span className="bag-label">Your bag</span>
          <span className="bag-icon"><BagIcon /><span className="bag-count">{itemCount}</span></span>
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> MADE FOR THE MILES</p>
            <h1 id="hero-title">Find your<br /><em>own stride.</em></h1>
            <p className="hero-description">
              Thoughtfully made shoes for wherever<br className="desktop-break" /> the day takes you.
            </p>
            <a className="hero-button" href="#products">Shop the collection <ArrowIcon /></a>
            <div className="hero-footnote">
              <span className="footnote-mark">✳</span>
              <span>Good shoes.<br />Better days.</span>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label="Colorful running shoe on a warm studio background">
            <div className="hero-image"></div>
            <span className="hero-stamp">STEP<br />INTO<br /><b>YOU</b></span>
            <div className="hero-caption"><span>01 / 04</span><span>THE EVERYDAY EDIT</span></div>
          </div>
        </section>

        <section className="shop-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</p>
              <h2>A little something<br className="mobile-break" /> for every step.</h2>
            </div>
            <p className="section-note">Considered comfort, built to go<br />wherever you do.</p>
          </div>

          <div className="shop-layout">
            <div className="catalog">
              <div className="catalog-toolbar">
                <div className="category-list" aria-label="Filter shoes by category">
                  {categories.map((category) => (
                    <button
                      className={`category-button ${activeCategory === category ? "selected" : ""}`}
                      key={category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <span className="result-count">{visibleProducts.length} PAIRS</span>
              </div>

              <div className="product-grid">
                {visibleProducts.map((product, index) => (
                  <article className="product-card" key={product.id}>
                    <div className={`product-image ${product.tone}`}>
                      <img src={product.image} alt={product.name} loading={index > 1 ? "lazy" : "eager"} />
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                      <button className="quick-add" onClick={() => addToCart(product)}>
                        <span>Add to bag</span><span className="quick-add-plus">+</span>
                      </button>
                    </div>
                    <div className="product-details">
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.color}</p>
                      </div>
                      <span className="product-price">${product.price}</span>
                    </div>
                    <span className="product-category">{product.category}</span>
                  </article>
                ))}
              </div>
            </div>

            <aside className="cart-panel" id="cart" aria-label="Shopping cart">
              <div className="cart-heading">
                <div>
                  <p className="eyebrow">THE GOOD CHOICES</p>
                  <h2>Your bag <span>({itemCount})</span></h2>
                </div>
                <BagIcon size={21} />
              </div>
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-bag"><BagIcon size={23} /></div>
                  <h3>Nothing in here. Yet.</h3>
                  <p>Your next favorite pair is just a few steps away.</p>
                  <a href="#products">Find your pair <ArrowIcon /></a>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((product) => (
                      <div className="cart-item" key={product.id}>
                        <div className={`cart-item-image ${product.tone}`}>
                          <img src={product.image} alt="" />
                        </div>
                        <div className="cart-item-info">
                          <div className="cart-item-title">
                            <div>
                              <h3>{product.name}</h3>
                              <p>{product.color}</p>
                            </div>
                            <button
                              className="remove-item"
                              onClick={() => removeFromCart(product.id)}
                              aria-label={`Remove ${product.name} from bag`}
                            >×</button>
                          </div>
                          <div className="cart-item-bottom">
                            <div className="quantity-control" aria-label={`${product.name} quantity`}>
                              <button onClick={() => decreaseQuantity(product.id)} aria-label={`Decrease ${product.name} quantity`}>−</button>
                              <span>{cart[product.id]}</span>
                              <button onClick={() => addToCart(product)} aria-label={`Increase ${product.name} quantity`}>+</button>
                            </div>
                            <span className="cart-line-price">${product.price * cart[product.id]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="shipping-note">
                      <span>✳</span>{" "}
                      {subtotal >= 150
                        ? "You’ve unlocked free shipping."
                        : `You’re $${150 - subtotal} away from free shipping.`}
                    </div>
                    <div className="subtotal-row"><span>Subtotal</span><strong>${subtotal}</strong></div>
                    <p className="tax-note">Shipping & taxes calculated at checkout.</p>
                    <button className="checkout-button" onClick={() => setNotice("Checkout is coming soon.")}>
                      Checkout <ArrowIcon />
                    </button>
                  </div>
                </>
              )}
              <div className="cart-perks"><span>✓ Easy 30-day returns</span><span>✓ Made to move</span></div>
            </aside>
          </div>
        </section>

        <section className="story-strip" id="story">
          <span className="story-symbol">✳</span>
          <p>Good things happen<br />when you <em>keep moving.</em></p>
          <span className="story-side">MADE FOR YOUR EVERYDAY</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#">sole<span>house</span><i>.</i></a>
        <span>Comfort for the way you move.</span>
        <span>© 2025 Sole House</span>
      </footer>

      <div className={`toast ${notice ? "visible" : ""}`} role="status" aria-live="polite">
        <span className="toast-check">✓</span>{notice}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
