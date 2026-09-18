"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, money, products } from "@/lib/data";
import { StoreProvider, useCartTotals, useStore } from "@/lib/store";
import { Icon } from "./icons";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ShellChrome>{children}</ShellChrome>
    </StoreProvider>
  );
}

function ShellChrome({ children }: { children: React.ReactNode }) {
  const { cartOpen, setCartOpen, searchOpen, setSearchOpen, toasts, activeOrder } = useStore();
  const { count, subtotal } = useCartTotals();
  const pathname = usePathname();

  useEffect(() => {
    setCartOpen(false);
    setSearchOpen(false);
  }, [pathname, setCartOpen, setSearchOpen]);

  return (
    <>
      <header className="main-header">
        {/* Top Announcement & Location Bar */}
        <div className="top-utility-bar">
          <div className="shell utility-inner">
            <div className="location-badge">
              <span className="location-pin-icon"><Icon name="pin" size={15} /></span>
              <span className="location-text">
                <strong>Delivering in 15 Mins</strong> to <span>Indiranagar, Bengaluru</span>
              </span>
            </div>
            <div className="utility-offers">
              <span className="offer-tag"><Icon name="tag" size={13} /> 15% OFF first order: <b>FIRSTLEAF</b></span>
              <span className="free-del-tag"><Icon name="truck" size={13} /> Free delivery above ₹299</span>
            </div>
          </div>
        </div>

        {/* Primary Navigation Bar */}
        <div className="nav-bar-wrap">
          <nav className="shell nav-main" aria-label="Main Navigation">
            <Link href="/" className="brand-logo" aria-label="Root & Leaf - Home">
              <span className="brand-icon">
                <Icon name="leaf" size={22} />
              </span>
              <div className="brand-text">
                <span className="brand-title">Root <i>&</i> Leaf</span>
                <span className="brand-subtitle">Fresh Fruits & Veggies</span>
              </div>
            </Link>

            {/* Quick Search Bar */}
            <div className="nav-search-box">
              <button
                type="button"
                className="search-trigger-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search fruits and vegetables"
              >
                <Icon name="search" size={18} />
                <span className="search-placeholder">Search fresh fruits, vegetables, herbs...</span>
                <span className="search-shortcut">Search</span>
              </button>
            </div>

            {/* Header Right Actions */}
            <div className="nav-right-actions">
              <Link href="/shop" className="nav-pill-link">
                <Icon name="shop" size={18} />
                <span>Shop All</span>
              </Link>
              <Link href="/favorites" className="nav-icon-link" aria-label="Saved items">
                <Icon name="heart" size={20} />
                <span className="action-label">Saved</span>
              </Link>
              <Link href="/orders" className="nav-icon-link" aria-label="My orders">
                <Icon name="user" size={20} />
                <span className="action-label">Orders</span>
              </Link>
              <button
                type="button"
                id="cart-target"
                className={`header-cart-pill ${count > 0 ? "has-items" : ""}`}
                onClick={() => setCartOpen(true)}
                aria-label={`Shopping cart with ${count} items, total ${money(subtotal)}`}
              >
                <span className="cart-icon-wrap">
                  <Icon name="basket" size={20} />
                  {count > 0 && <span className="cart-badge-count">{count}</span>}
                </span>
                <div className="cart-pill-copy">
                  <span className="cart-pill-title">My Basket</span>
                  <span className="cart-pill-price">{count > 0 ? money(subtotal) : "₹0"}</span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* ECOM Top Category Bar */}
        <TopCategoryShelf />
      </header>

      {/* Main Content */}
      <main className="site-content">{children}</main>

      {/* Active Order Tracker Pill */}
      {activeOrder && activeOrder.stage < 3 && (
        <Link href={`/orders/${activeOrder.id}/track`} className="track-pill" aria-label="Track active delivery">
          <span className="pulse-dot" />
          <span>Live Order: {activeOrder.slot}</span>
          <Icon name="arrow" size={16} />
        </Link>
      )}

      {/* Floating Bottom Quick Cart Bar (Visible whenever items are in cart) */}
      <QuickCartBar count={count} subtotal={subtotal} onOpenCart={() => setCartOpen(true)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavBar count={count} onSearch={() => setSearchOpen(true)} onCart={() => setCartOpen(true)} />

      {/* Slide-over Cart Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Notification Toast Stack */}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div className="toast" key={t.id}>
            <span className="toast-check"><Icon name="check" size={16} /></span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// Top Category Horizontal Bar (like Blinkit / Instamart / Zepto)
function TopCategoryShelf() {
  const pathname = usePathname();

  return (
    <div className="top-category-shelf-wrap" role="navigation" aria-label="Product Categories">
      <div className="shell">
        <div className="top-category-scroll">
          {categories.map((c) => {
            const href = c.slug === "all" ? "/shop" : `/shop/${c.slug}`;
            const isActive =
              (c.slug === "all" && pathname === "/shop") ||
              pathname === `/shop/${c.slug}`;

            return (
              <Link
                key={c.slug}
                href={href}
                className={`category-chip ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="category-emoji" role="img" aria-label={c.name}>
                  {c.icon}
                </span>
                <span className="category-chip-name">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Floating Quick Cart Bar at screen bottom (Visual cue for all users)
function QuickCartBar({ count, subtotal, onOpenCart }: { count: number; subtotal: number; onOpenCart: () => void }) {
  if (count <= 0) return null;

  return (
    <aside className="floating-quick-cart" aria-label="Quick cart bar">
      <div className="quick-cart-inner">
        <div className="quick-cart-details">
          <div className="quick-cart-badge">
            <Icon name="basket" size={20} />
            <span>{count}</span>
          </div>
          <div className="quick-cart-text">
            <strong>{money(subtotal)}</strong>
            <small>{count} {count === 1 ? "item" : "items"} in basket</small>
          </div>
        </div>
        <button type="button" className="quick-cart-btn" onClick={onOpenCart}>
          <span>View Basket</span>
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </aside>
  );
}

function MobileNavBar({ count, onSearch, onCart }: { count: number; onSearch: () => void; onCart: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile menu">
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        <Icon name="home" size={22} />
        <span>Home</span>
      </Link>
      <Link href="/shop" className={pathname.startsWith("/shop") ? "active" : ""}>
        <Icon name="shop" size={22} />
        <span>Shop</span>
      </Link>
      <button type="button" onClick={onSearch}>
        <Icon name="search" size={22} />
        <span>Search</span>
      </button>
      <button type="button" onClick={onCart} className="mobile-cart-btn">
        <span className="mobile-cart-icon-wrap">
          <Icon name="basket" size={22} />
          {count > 0 && <span className="mobile-count-pill">{count}</span>}
        </span>
        <span>Basket</span>
      </button>
      <Link href="/orders" className={pathname.startsWith("/orders") ? "active" : ""}>
        <Icon name="user" size={22} />
        <span>Orders</span>
      </Link>
    </nav>
  );
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { cart, setQty } = useStore();
  const { count, subtotal } = useCartTotals();
  const router = useRouter();

  const lines = Object.entries(cart)
    .map(([id, line]) => ({ product: products.find((p) => p.id === id)!, quantity: line.quantity, addedAt: line.addedAt }))
    .filter((x) => Boolean(x.product));

  const freeDeliveryThreshold = 299;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const neededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <button type="button" className="drawer-backdrop" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer">
        <div className="drawer-head">
          <div>
            <span className="drawer-eyebrow">My Basket</span>
            <h2 className="drawer-title">{count} {count === 1 ? "Item" : "Items"}</h2>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Free delivery visual progress */}
        <div className="delivery-progress-banner">
          <div className="del-text">
            {isFreeDelivery ? (
              <span>🎉 <b>Yay! Free Delivery</b> on this order!</span>
            ) : (
              <span>Add <b>{money(neededForFree)}</b> more for <b>FREE Delivery</b>!</span>
            )}
          </div>
          <div className="del-bar-track">
            <div
              className="del-bar-fill"
              style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {!lines.length ? (
          <div className="empty-basket-state">
            <div className="empty-cart-emoji">🧺</div>
            <h3>Your basket is empty</h3>
            <p>Add delicious fresh fruits and vegetables to get started.</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                onClose();
                router.push("/shop");
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
              {lines.map(({ product, quantity }) => (
                <div className="drawer-cart-line" key={product.id}>
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  <div className="cart-item-meta">
                    <h4>{product.name}</h4>
                    <span className="cart-item-unit">{product.unit}</span>
                    <div className="cart-item-price-row">
                      <strong>{money(product.price * quantity)}</strong>
                      <small>({money(product.price)} each)</small>
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="stepper-mini">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="drawer-bill-summary">
                <div className="bill-line">
                  <span>Items Total</span>
                  <strong>{money(subtotal)}</strong>
                </div>
                <div className="bill-line">
                  <span>Delivery Charge</span>
                  <span>{isFreeDelivery ? <b className="free-text">FREE</b> : "₹29"}</span>
                </div>
                <div className="bill-line bill-grand">
                  <span>To Pay</span>
                  <strong>{money(subtotal + (isFreeDelivery ? 0 : 29))}</strong>
                </div>
              </div>

              <button
                type="button"
                className="checkout-main-btn"
                onClick={() => {
                  onClose();
                  router.push("/checkout");
                }}
              >
                <span>Proceed to Checkout</span>
                <strong>{money(subtotal + (isFreeDelivery ? 0 : 29))}</strong>
                <Icon name="arrow" size={18} />
              </button>

              <Link href="/cart" onClick={onClose} className="view-full-cart-link">
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function QuantityStepper({ id, quantity }: { id: string; quantity: number }) {
  const { setQty } = useStore();
  return (
    <div className="card-stepper">
      <button
        type="button"
        className="stepper-btn dec-btn"
        onClick={() => setQty(id, quantity - 1)}
        aria-label="Decrease quantity"
      >
        <Icon name="minus" size={14} />
      </button>
      <span className="stepper-val">{quantity}</span>
      <button
        type="button"
        className="stepper-btn inc-btn"
        onClick={() => setQty(id, quantity + 1)}
        aria-label="Increase quantity"
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    input.current?.focus();
  }, []);

  const matches = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 8);

  const handleSelect = (id: string) => {
    onClose();
    router.push(`/product/${id}`);
  };

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-label="Search produce">
      <button type="button" className="search-dismiss" onClick={onClose} aria-label="Close search" />
      <section className="search-modal-panel">
        <div className="search-input-header">
          <Icon name="search" size={22} />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apples, tomatoes, spinach, bananas..."
            aria-label="Search fruits and vegetables"
          />
          <button type="button" className="clear-search-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        {query ? (
          <div className="search-results-list">
            <span className="results-count-label">
              Found {matches.length} matching {matches.length === 1 ? "item" : "items"}
            </span>
            {matches.length ? (
              <div className="results-grid">
                {matches.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="search-result-item"
                    onClick={() => handleSelect(p.id)}
                  >
                    <img src={p.image} alt={p.name} />
                    <div className="result-text">
                      <strong>{p.name}</strong>
                      <small>{p.farm} · {p.unit}</small>
                    </div>
                    <span className="result-price">{money(p.price)}</span>
                    <Icon name="arrow" size={16} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-search-results">
                <p>No matches found for &quot;{query}&quot;</p>
                <small>Try searching for apple, potato, banana, or tomato.</small>
              </div>
            )}
          </div>
        ) : (
          <div className="search-quick-tags">
            <span className="quick-tags-title">Popular Daily Searches:</span>
            <div className="quick-tag-pills">
              {["🍎 Apples", "🍌 Bananas", "🍅 Tomatoes", "🥬 Spinach", "🥔 Potatoes", "🥭 Mangoes", "🌿 Coriander", "🍉 Watermelon"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item.split(" ")[1])}
                  className="tag-pill"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="main-footer">
      <div className="shell footer-layout">
        <div className="footer-brand-col">
          <Link href="/" className="brand-logo footer-logo">
            <span className="brand-icon">
              <Icon name="leaf" size={22} />
            </span>
            <span className="brand-title">Root <i>&</i> Leaf</span>
          </Link>
          <p className="footer-desc">
            Directly from regional farms to your doorstep in 15 minutes. 100% natural, farm-fresh fruits & vegetables.
          </p>
          <div className="footer-badges">
            <span>⚡ 15 Mins Delivery</span>
            <span>🌱 Farm Direct</span>
            <span>🚫 0 Plastic Waste</span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Categories</h4>
          <Link href="/shop/fruits">Fresh Fruits 🍎</Link>
          <Link href="/shop/vegetables">Fresh Vegetables 🥦</Link>
          <Link href="/shop/leafy-greens">Leafy Greens 🥬</Link>
          <Link href="/shop/roots">Roots & Tubers 🥕</Link>
          <Link href="/shop/herbs">Herbs & Chillies 🌿</Link>
        </div>

        <div className="footer-links-col">
          <h4>Account & Support</h4>
          <Link href="/orders">Track My Orders</Link>
          <Link href="/favorites">Saved Products</Link>
          <Link href="/account">Delivery Address</Link>
          <a href="tel:+918049281200">Help: +91 80 4928 1200</a>
        </div>

        <div className="footer-newsletter-col">
          <h4>Daily Farm Offers</h4>
          <p>Get daily harvest updates and exclusive fruit box discounts.</p>
          <div className="newsletter-box">
            <input placeholder="Enter your mobile or email" aria-label="Newsletter input" />
            <button type="button" aria-label="Subscribe">
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom-row">
        <span>© 2026 Root & Leaf. Farm Fresh Fruits & Vegetables.</span>
        <span>Bangalore, India · Instant Delivery</span>
      </div>
    </footer>
  );
}

