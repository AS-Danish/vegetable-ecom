"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addresses, categories, money, pastOrders, products, promoCodes } from "@/lib/data";
import { useCartTotals, useStore } from "@/lib/store";
import { Footer, QuantityStepper } from "./site-shell";
import { Icon } from "./icons";
import { ProductCard } from "./product-card";

export function HomeView() {
  const { cart } = useStore();
  const history = Object.keys(cart).length > 0 || pastOrders.length > 0;

  const fruitItems = useMemo(
    () => products.filter((p) => p.category === "Fruits" || p.tags.includes("fruits")),
    []
  );

  const veggieItems = useMemo(
    () => products.filter((p) => p.category !== "Fruits"),
    []
  );

  const popularItems = useMemo(
    () => products.filter((p) => p.tags.includes("popular")).slice(0, 8),
    []
  );

  return (
    <>
      {/* Modern Hero Promo Banner */}
      <section className="hero-section shell">
        <div className="hero-banner-card">
          <div className="hero-banner-content">
            <div className="hero-pill-badge">
              <Icon name="spark" size={15} />
              <span>15 MINS EXPRESS DELIVERY · INDIRANAGAR</span>
            </div>
            <h1 className="hero-heading">
              Farm Fresh <span>Fruits & Veggies</span> At Your Doorstep.
            </h1>
            <p className="hero-subtext">
              Handpicked at dawn from local partner orchards and farms. 100% natural, hygienic, and plastic-free packaging.
            </p>
            <div className="hero-cta-group">
              <Link href="/shop/fruits" className="hero-btn-primary">
                <span>Shop Fresh Fruits 🍎</span>
                <Icon name="arrow" size={16} />
              </Link>
              <Link href="/shop" className="hero-btn-secondary">
                <span>Explore All Veggies 🥦</span>
              </Link>
            </div>
          </div>
          <div className="hero-visual-graphic">
            <div className="hero-img-stack">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh produce basket"
                className="hero-main-img"
              />
              <div className="floating-stat-badge">
                <span className="stat-emoji">⚡</span>
                <div>
                  <strong>15 Mins</strong>
                  <small>Average Delivery</small>
                </div>
              </div>
              <div className="floating-stat-badge badge-discount">
                <span className="stat-emoji">🏷️</span>
                <div>
                  <strong>Up to 25% OFF</strong>
                  <small>On Daily Harvest</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Category Grid (Accessible for all users with large icons & photos) */}
      <section className="section shell category-overview-section">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">Explore Categories</span>
            <h2 className="section-heading">Shop By Category</h2>
          </div>
          <Link href="/shop" className="view-all-link">
            <span>View All</span>
            <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="category-card-grid">
          {categories.filter((c) => c.slug !== "all").map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="visual-category-card"
            >
              <div className="cat-img-wrapper">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <span className="cat-emoji-badge">{cat.icon}</span>
              </div>
              <strong className="cat-name">{cat.name}</strong>
              <small className="cat-sub">{cat.blurb}</small>
            </Link>
          ))}
        </div>
      </section>

      {/* Fresh Fruits Section (New core feature requested) */}
      <section className="section shell fresh-fruits-showcase">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow font-accent">Farm Harvest</span>
            <h2 className="section-heading">Fresh Fruits Today 🍎</h2>
          </div>
          <Link href="/shop/fruits" className="view-all-link">
            <span>See All Fruits</span>
            <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="products-horizontal-grid">
          {fruitItems.slice(0, 8).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      {/* Weekend Offer Highlight Banner */}
      <section className="shell promo-banner-section">
        <div className="market-deal-card">
          <div className="deal-info">
            <span className="deal-pill">SUPER SAVER DEAL</span>
            <h2>Get Flat ₹75 Off On Your Basket</h2>
            <p>
              Use code <b className="promo-highlight">FARMDAY</b> on orders above ₹699. Valid on all fruits, greens, and veggies!
            </p>
            <Link href="/shop" className="deal-action-btn">
              <span>Shop Now & Save</span>
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="deal-visual">
            <span className="deal-tag-big">₹75 OFF</span>
          </div>
        </div>
      </section>

      {/* Daily Fresh Vegetables Section */}
      <section className="section shell fresh-veggies-showcase">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">Local Greens & Roots</span>
            <h2 className="section-heading">Daily Fresh Vegetables 🥦</h2>
          </div>
          <Link href="/shop" className="view-all-link">
            <span>See All Veggies</span>
            <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="products-horizontal-grid">
          {veggieItems.slice(0, 8).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      {/* Popular Essentials */}
      <section className="section shell popular-essentials-showcase">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">Most Loved</span>
            <h2 className="section-heading">Kitchen Essentials & Bestsellers ⭐</h2>
          </div>
          <Link href="/shop" className="view-all-link">
            <span>Shop Bestsellers</span>
            <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="products-horizontal-grid">
          {popularItems.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      {/* Previous Orders Quick Reorder */}
      {history && (
        <section className="section shell buy-again-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">Quick Repeat</span>
              <h2 className="section-heading">Buy Again 🔄</h2>
            </div>
          </div>
          <div className="quick-reorder-grid">
            {products.slice(0, 4).map((p) => (
              <MiniProductCard key={p.id} id={p.id} />
            ))}
          </div>
        </section>
      )}

      {/* Visual Trust Assurances (Clear icons for low literacy) */}
      <section className="shell assurances-section">
        <div className="assurances-grid">
          <div className="assurance-box">
            <span className="assure-icon">⚡</span>
            <strong>15-Minute Delivery</strong>
            <p>Fastest drop from local dark stores directly to your kitchen.</p>
          </div>
          <div className="assurance-box">
            <span className="assure-icon">🌱</span>
            <strong>100% Chemical-Free</strong>
            <p>Zero carbide ripening, naturally harvested and hygienic.</p>
          </div>
          <div className="assurance-box">
            <span className="assure-icon">💵</span>
            <strong>Cash on Delivery</strong>
            <p>Pay cash or UPI comfortably at your doorstep upon delivery.</p>
          </div>
          <div className="assurance-box">
            <span className="assure-icon">👍</span>
            <strong>No Questions Replacement</strong>
            <p>Not satisfied with quality? Instant refund or replacement.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function MiniProductCard({ id }: { id: string }) {
  const p = products.find((x) => x.id === id);
  const { cart, add, notify } = useStore();
  if (!p) return null;
  const qty = cart[id]?.quantity ?? 0;

  return (
    <div className="mini-product-card">
      <img src={p.image} alt={p.name} className="mini-p-img" />
      <div className="mini-p-meta">
        <strong>{p.name}</strong>
        <span className="mini-p-sub">{p.unit} · {money(p.price)}</span>
      </div>
      {qty > 0 ? (
        <QuantityStepper id={id} quantity={qty} />
      ) : (
        <button
          type="button"
          className="mini-add-btn"
          onClick={() => {
            add(id);
            notify(`${p.name} added to cart`);
          }}
          aria-label={`Add ${p.name}`}
        >
          <Icon name="plus" size={15} />
          <span>ADD</span>
        </button>
      )}
    </div>
  );
}

export function ShopView({ category }: { category?: string }) {
  const initialCategorySlug = category ?? "all";
  const [selectedSlug, setSelectedSlug] = useState(initialCategorySlug);
  const [sort, setSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(350);

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        // Slug filtering
        if (selectedSlug === "all") return true;
        if (selectedSlug === "fruits") return p.category === "Fruits" || p.tags.includes("fruits");
        if (selectedSlug === "vegetables") return p.category !== "Fruits" || p.tags.includes("vegetables");
        if (selectedSlug === "leafy-greens") return p.category === "Leafy greens" || p.tags.includes("leafy-greens");
        if (selectedSlug === "roots") return p.category === "Roots" || p.tags.includes("roots");
        if (selectedSlug === "herbs") return p.category === "Herbs" || p.tags.includes("herbs");
        if (selectedSlug === "exotic") return p.category === "Exotic" || p.tags.includes("exotic");
        if (selectedSlug === "seasonal") return p.category === "Seasonal" || p.tags.includes("seasonal");
        return true;
      })
      .filter((p) => p.price <= maxPrice)
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [selectedSlug, maxPrice, sort]);

  const activeCategoryMeta = categories.find((c) => c.slug === selectedSlug) ?? categories[0];

  return (
    <>
      {/* Category Header */}
      <section className="shop-header-banner shell">
        <div className="shop-header-text">
          <span className="shop-category-badge">
            {activeCategoryMeta.icon} {activeCategoryMeta.name}
          </span>
          <h1>Fresh Produce Market</h1>
          <p>{activeCategoryMeta.blurb} — {filtered.length} farm fresh items available today</p>
        </div>

        {/* Top Category Filter Selector */}
        <div className="shop-category-tabs" role="tablist" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={`shop-tab-pill ${selectedSlug === c.slug ? "active" : ""}`}
              onClick={() => setSelectedSlug(c.slug)}
            >
              <span className="shop-tab-icon">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Shop Results & Filter Bar */}
      <section className="shell shop-content-area">
        <div className="shop-toolbar-row">
          <div className="results-count">
            Showing <b>{filtered.length}</b> fresh items
          </div>
          <div className="toolbar-controls">
            <div className="price-slider-quick">
              <span>Max Price: <b>{money(maxPrice)}</b></span>
              <input
                type="range"
                min="30"
                max="350"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                aria-label="Filter by maximum price"
              />
            </div>
            <div className="sort-select-box">
              <label htmlFor="sort-dropdown">Sort by:</label>
              <select
                id="sort-dropdown"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="popular">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length ? (
          <div className="product-grid-view">
            {filtered.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="no-items-state">
            <span className="no-items-emoji">🔍</span>
            <h3>No products found</h3>
            <p>Try adjusting your price filter or selecting a different category.</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                setSelectedSlug("all");
                setMaxPrice(350);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export function ProductView({ id }: { id: string }) {
  const p = products.find((x) => x.id === id) ?? products[0];
  const { cart, add, setQty, favorites, toggleFavorite, notify } = useStore();
  const qty = cart[p.id]?.quantity ?? 0;

  const related = useMemo(
    () => products.filter((x) => x.id !== p.id && (x.category === p.category || x.tags.some((t) => p.tags.includes(t)))).slice(0, 4),
    [p]
  );

  return (
    <>
      <section className="product-detail-page shell">
        <Link href="/shop" className="back-nav-btn">
          ← Back to Shop
        </Link>

        <div className="product-detail-grid">
          {/* Product Big Photo */}
          <div className="product-detail-gallery">
            <div className="detail-img-container">
              <img src={p.image} alt={p.name} />
              {p.offer && <span className="detail-offer-tag">{p.offer}</span>}
              <span className="detail-fresh-tag">{p.badge}</span>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="product-detail-main">
            <div className="detail-farm-chip">
              <Icon name="pin" size={15} />
              <span>Grown at {p.farm} · {p.distance} away</span>
            </div>

            <h1 className="detail-title">{p.name}</h1>
            <p className="detail-unit-badge">{p.unit}</p>

            <div className="detail-rating-row">
              <span className="rating-stars">★★★★★</span>
              <strong>{p.rating}</strong>
              <small>(120+ verified customer ratings)</small>
            </div>

            <div className="detail-price-box">
              <span className="detail-price">{money(p.price)}</span>
              {p.originalPrice && (
                <del className="detail-strike-price">{money(p.originalPrice)}</del>
              )}
              {p.offer && <span className="detail-savings-badge">{p.offer}</span>}
            </div>

            <p className="detail-description">{p.description}</p>

            {/* Prominent Add to Basket action */}
            <div className="detail-action-container">
              {qty === 0 ? (
                <button
                  type="button"
                  className="detail-add-cart-btn"
                  onClick={() => {
                    add(p.id);
                    notify(`${p.name} added to cart`);
                  }}
                >
                  <Icon name="plus" size={20} />
                  <span>ADD TO BASKET</span>
                </button>
              ) : (
                <div className="detail-stepper-large">
                  <button
                    type="button"
                    onClick={() => setQty(p.id, qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Icon name="minus" size={18} />
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(p.id, qty + 1)}
                    aria-label="Increase quantity"
                  >
                    <Icon name="plus" size={18} />
                  </button>
                </div>
              )}

              <button
                type="button"
                className={`detail-fav-btn ${favorites.has(p.id) ? "saved" : ""}`}
                onClick={() => toggleFavorite(p.id)}
                aria-label="Save to favorites"
              >
                <Icon name="heart" size={22} />
              </button>
            </div>

            {/* Key Visual Guarantees */}
            <div className="detail-guarantees">
              <div className="guarantee-item">
                <Icon name="truck" size={18} />
                <div>
                  <strong>15 Mins Delivery</strong>
                  <small>Fresh from nearest hub</small>
                </div>
              </div>
              <div className="guarantee-item">
                <Icon name="leaf" size={18} />
                <div>
                  <strong>100% Chemical-Free</strong>
                  <small>Naturally grown produce</small>
                </div>
              </div>
              <div className="guarantee-item">
                <Icon name="cash" size={18} />
                <div>
                  <strong>Cash on Delivery</strong>
                  <small>Pay after checking quality</small>
                </div>
              </div>
            </div>

            {/* Storage and Nutrition Information */}
            <div className="detail-info-cards">
              {p.storage && (
                <div className="info-card">
                  <strong>💡 Storage Advice</strong>
                  <p>{p.storage}</p>
                </div>
              )}
              {p.nutrition && (
                <div className="info-card">
                  <strong>🥗 Key Nutrients</strong>
                  <div className="nutrition-pills">
                    {p.nutrition.map((item) => (
                      <span key={item} className="nutrient-pill">{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-heading">You May Also Like</h2>
            <div className="products-horizontal-grid">
              {related.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export function CartView() {
  const { cart, setQty } = useStore();
  const { count, subtotal } = useCartTotals();
  const router = useRouter();

  const lines = Object.entries(cart)
    .map(([id, line]) => ({ product: products.find((p) => p.id === id)!, quantity: line.quantity, addedAt: line.addedAt }))
    .filter((x) => Boolean(x.product));

  const freeDeliveryThreshold = 299;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  return (
    <>
      <section className="cart-page-layout shell">
        <div className="cart-page-header">
          <h1>My Shopping Basket 🧺</h1>
          <p>{count} {count === 1 ? "item" : "items"} selected</p>
        </div>

        {lines.length ? (
          <div className="cart-split-grid">
            <div className="cart-items-card">
              {lines.map(({ product, quantity }) => (
                <div className="cart-item-row" key={product.id}>
                  <img src={product.image} alt={product.name} className="cart-row-img" />
                  <div className="cart-row-info">
                    <h3>{product.name}</h3>
                    <span className="cart-row-unit">{product.unit}</span>
                    <span className="cart-row-unit-price">{money(product.price)} each</span>
                  </div>
                  <div className="cart-row-stepper">
                    <div className="stepper-mini">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, quantity - 1)}
                        aria-label="Decrease"
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, quantity + 1)}
                        aria-label="Increase"
                      >
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                  </div>
                  <strong className="cart-row-subtotal">
                    {money(product.price * quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="cart-bill-card">
              <h3>Bill Summary</h3>
              <div className="bill-row">
                <span>Items Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <div className="bill-row">
                <span>Delivery Charge</span>
                <span>{isFreeDelivery ? <b className="free-text">FREE</b> : "₹29"}</span>
              </div>
              <div className="bill-row bill-grand-total">
                <span>Grand Total</span>
                <strong>{money(subtotal + (isFreeDelivery ? 0 : 29))}</strong>
              </div>

              <button
                type="button"
                className="checkout-btn-full"
                onClick={() => router.push("/checkout")}
              >
                <span>Proceed to Checkout</span>
                <Icon name="arrow" size={18} />
              </button>

              <p className="delivery-time-note">
                <Icon name="clock" size={14} /> Delivering within 15 mins to Indiranagar
              </p>
            </div>
          </div>
        ) : (
          <div className="empty-cart-view">
            <span className="empty-emoji">🧺</span>
            <h2>Your basket is completely empty</h2>
            <p>Explore fresh fruits and vegetables to add to your bag.</p>
            <Link href="/shop" className="primary-btn">
              Start Shopping
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export function CheckoutView() {
  const { cart, placeOrder, notify } = useStore();
  const { subtotal } = useCartTotals();
  const router = useRouter();

  const [address, setAddress] = useState("home");
  const [slot, setSlot] = useState("15 Mins · Express Delivery");
  const [payment, setPayment] = useState("cod"); // Default to Cash on Delivery (easiest for low-literacy users)
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectedAddress = addresses.find((a) => a.id === address) ?? addresses[0];
  const delivery = subtotal >= 299 ? 0 : 29;
  const total = Math.max(0, subtotal + delivery - discount);

  const applyCoupon = () => {
    const match = promoCodes.find((p) => p.code === coupon.trim().toUpperCase());
    if (!match || subtotal < match.min) {
      notify(`Add items worth ${money(match?.min ?? 299)} to use this coupon`);
      return;
    }
    const value = match.flat ?? Math.round((subtotal * (match.percent ?? 0)) / 100);
    setDiscount(value);
    notify(`Coupon ${match.code} applied! You saved ${money(value)}`);
  };

  const submitOrder = async () => {
    if (!Object.keys(cart).length) {
      router.push("/shop");
      return;
    }
    setLoading(true);
    const id = await placeOrder({
      address: selectedAddress.text,
      slot,
      payment,
    });
    setTimeout(() => router.push(`/order-confirmed/${id}`), 400);
  };

  return (
    <>
      <section className="checkout-page-layout shell">
        <Link href="/cart" className="back-nav-btn">
          ← Back to Basket
        </Link>

        <div className="checkout-split-grid">
          <div className="checkout-steps-col">
            <h1 className="checkout-title">Checkout & Place Order</h1>

            {/* Step 1: Delivery Address */}
            <div className="checkout-step-box">
              <div className="step-header">
                <span className="step-num-badge">1</span>
                <h2>Select Delivery Address</h2>
              </div>
              <div className="address-options-grid">
                {addresses.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`address-card-btn ${address === a.id ? "selected" : ""}`}
                    onClick={() => setAddress(a.id)}
                  >
                    <div className="addr-top-row">
                      <span className="addr-icon"><Icon name="home" size={16} /></span>
                      <strong>{a.label}</strong>
                      {address === a.id && <span className="checked-indicator"><Icon name="check" size={14} /></span>}
                    </div>
                    <p className="addr-text">{a.text}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Delivery Timing */}
            <div className="checkout-step-box">
              <div className="step-header">
                <span className="step-num-badge">2</span>
                <h2>Choose Delivery Time</h2>
              </div>
              <div className="timing-options-row">
                {[
                  "15 Mins · Express Delivery",
                  "Today · 4:00 PM – 6:00 PM",
                  "Today · 7:00 PM – 9:00 PM",
                  "Tomorrow Morning · 7:00 AM – 9:00 AM",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`timing-pill-btn ${slot === s ? "selected" : ""}`}
                    onClick={() => setSlot(s)}
                  >
                    <span className="time-dot" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method (Visual-First with Clear Icons) */}
            <div className="checkout-step-box">
              <div className="step-header">
                <span className="step-num-badge">3</span>
                <h2>Choose Payment Option</h2>
              </div>
              <div className="payment-options-grid">
                {[
                  {
                    id: "cod",
                    icon: "💵",
                    title: "Cash on Delivery",
                    subtitle: "Pay cash or UPI at your door upon receiving",
                  },
                  {
                    id: "upi",
                    icon: "📱",
                    title: "UPI (Google Pay, PhonePe, Paytm)",
                    subtitle: "Instant payment via any UPI app",
                  },
                  {
                    id: "card",
                    icon: "💳",
                    title: "Credit / Debit Card",
                    subtitle: "Visa, Mastercard, RuPay cards accepted",
                  },
                  {
                    id: "netbanking",
                    icon: "🏦",
                    title: "Net Banking",
                    subtitle: "All major Indian banks supported",
                  },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    className={`payment-method-card ${payment === pm.id ? "selected" : ""}`}
                    onClick={() => setPayment(pm.id)}
                  >
                    <span className="pm-icon">{pm.icon}</span>
                    <div className="pm-meta">
                      <strong>{pm.title}</strong>
                      <small>{pm.subtitle}</small>
                    </div>
                    {payment === pm.id && (
                      <span className="checked-indicator">
                        <Icon name="check" size={14} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Promo Coupons */}
            <div className="checkout-step-box">
              <div className="step-header">
                <span className="step-num-badge">4</span>
                <h2>Apply Discount Coupon</h2>
              </div>
              <div className="coupon-input-group">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code (e.g. FIRSTLEAF)"
                  aria-label="Coupon code input"
                />
                <button type="button" onClick={applyCoupon} className="apply-btn">
                  Apply
                </button>
              </div>
              <div className="quick-coupons-list">
                {promoCodes.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    className="coupon-tag-btn"
                    onClick={() => setCoupon(p.code)}
                  >
                    <b>{p.code}</b> — {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Right Summary */}
          <div className="checkout-sidebar-col">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Items Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <div className="summary-line">
                <span>Delivery Fee</span>
                <span>{delivery === 0 ? <b className="free-text">FREE</b> : money(delivery)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-line discount-highlight">
                  <span>Coupon Discount</span>
                  <strong>−{money(discount)}</strong>
                </div>
              )}
              <div className="summary-line grand-total-line">
                <span>Final Total</span>
                <strong>{money(total)}</strong>
              </div>

              <div className="delivery-recap">
                <div className="recap-row">
                  <Icon name="pin" size={16} />
                  <span>Delivering to <b>{selectedAddress.label}</b></span>
                </div>
                <div className="recap-row">
                  <Icon name="clock" size={16} />
                  <span>Timing: <b>{slot}</b></span>
                </div>
              </div>

              <button
                type="button"
                className="place-order-big-btn"
                onClick={submitOrder}
                disabled={loading}
              >
                {loading ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <span>Place Order · {money(total)}</span>
                    <Icon name="arrow" size={18} />
                  </>
                )}
              </button>

              <small className="safe-checkout-note">
                🔒 Safe & encrypted checkout · Pay with confidence
              </small>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function ConfirmationView({ id }: { id: string }) {
  const { activeOrder } = useStore();
  const order = activeOrder?.id === id ? activeOrder : null;

  return (
    <section className="confirmation-page shell">
      <div className="confirmation-box">
        <div className="conf-icon-circle">
          <Icon name="check" size={40} />
        </div>
        <span className="conf-order-id">Order ID: #{id}</span>
        <h1>Your Order Is Confirmed! 🎉</h1>
        <p className="conf-subtext">
          Fresh fruits & vegetables are being packed at the nearby farm hub and will be delivered during{" "}
          <strong>{order?.slot ?? "in 15 mins"}</strong>.
        </p>

        <div className="order-details-card">
          <div className="detail-field">
            <span>Delivering To</span>
            <strong>{order?.address ?? addresses[0].text}</strong>
          </div>
          <div className="detail-field">
            <span>Payment Mode</span>
            <strong>
              {order?.payment === "cod"
                ? "💵 Cash / UPI on Delivery"
                : order?.payment === "upi"
                ? "📱 UPI Paid Online"
                : "💳 Card Payment"}
            </strong>
          </div>
          <div className="detail-field">
            <span>Estimated Delivery</span>
            <strong className="green-text">⚡ 15 Minutes</strong>
          </div>
        </div>

        <div className="conf-cta-group">
          <Link href={`/orders/${id}/track`} className="primary-btn">
            Track Live Delivery 🛵
          </Link>
          <Link href="/" className="secondary-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrackingView({ id }: { id: string }) {
  const { activeOrder, advanceOrder } = useStore();
  const isCurrent = activeOrder?.id === id;
  const stage = isCurrent ? activeOrder.stage : 1;
  const stages = ["Order Confirmed", "Being Packed", "Out For Delivery", "Delivered"];

  return (
    <section className="tracking-page shell">
      <div className="tracking-card-main">
        <div className="tracking-header">
          <span className="track-id-badge">Live Tracking · Order #{id}</span>
          <h1>Your Harvest Is On The Way! 🛵</h1>
          <p>Expected Delivery: {activeOrder?.slot ?? "Within 15 minutes"}</p>
        </div>

        {/* Step progress bar */}
        <div className="tracking-progress-steps">
          {stages.map((st, i) => (
            <div className={`track-step-node ${i <= stage ? "completed" : ""}`} key={st}>
              <div className="step-circle">
                {i < stage ? <Icon name="check" size={16} /> : i + 1}
              </div>
              <span className="step-title">{st}</span>
            </div>
          ))}
        </div>

        <div className="tracking-rider-card">
          <div className="rider-avatar">🛵</div>
          <div className="rider-meta">
            <strong>Ramesh Kumar</strong>
            <small>Delivery Partner · ★ 4.9 Rating</small>
          </div>
          <button
            type="button"
            className="call-rider-btn"
            onClick={advanceOrder}
            title="Advance demo stage"
          >
            Advance Stage ⚡
          </button>
        </div>

        <div className="tracking-bottom-actions">
          <Link href="/orders" className="view-orders-btn">
            View All Orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FavoritesView() {
  const { favorites } = useStore();
  const saved = products.filter((p) => favorites.has(p.id));

  return (
    <>
      <section className="favorites-page shell">
        <div className="page-header-simple">
          <h1>Saved Items ❤️</h1>
          <p>{saved.length} {saved.length === 1 ? "item" : "items"} saved in your wishlist</p>
        </div>

        {saved.length ? (
          <div className="product-grid-view">
            {saved.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state-view">
            <span className="empty-emoji">❤️</span>
            <h2>No saved items yet</h2>
            <p>Tap the heart icon on any fruit or vegetable to save it for later.</p>
            <Link href="/shop" className="primary-btn">
              Explore Products
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export function OrdersView() {
  const { activeOrder } = useStore();
  const stageLabels = ["Order Confirmed", "Being Packed", "Out For Delivery", "Delivered"];

  return (
    <section className="orders-page-layout shell">
      <div className="page-header-simple">
        <h1>My Orders 📦</h1>
        <p>Track live deliveries and view previous orders</p>
      </div>

      {activeOrder && (
        <div className="active-order-highlight">
          <div className="active-order-header">
            <span className="live-status-pill">
              <span className="pulse-dot" /> LIVE ORDER #{activeOrder.id}
            </span>
            <h3>{stageLabels[activeOrder.stage]}</h3>
            <p>Slot: {activeOrder.slot} · ETA: 15 Mins</p>
          </div>
          <Link href={`/orders/${activeOrder.id}/track`} className="primary-btn">
            Track Delivery 🛵
          </Link>
        </div>
      )}

      <div className="past-orders-section">
        <h2>Order History</h2>
        <div className="past-orders-list">
          {pastOrders.map((o) => (
            <div key={o.id} className="past-order-row">
              <div className="order-col-info">
                <span className="order-tag-label">Order #{o.id} · {o.date}</span>
                <h4>
                  {o.items
                    .map((id) => products.find((p) => p.id === id)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </h4>
                <p>Status: Delivered · 100% Quality Guaranteed</p>
              </div>
              <div className="order-col-price">
                <strong>{money(o.total)}</strong>
                <Link href="/shop" className="reorder-btn">
                  Reorder
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AccountView() {
  return (
    <section className="account-page-layout shell">
      <div className="page-header-simple">
        <h1>My Profile 👤</h1>
        <p>Manage your delivery addresses and preferences</p>
      </div>

      <div className="account-card-box">
        <div className="user-profile-header">
          <div className="user-avatar-circle">A</div>
          <div>
            <h2>Asha Mehta</h2>
            <p>asha@example.com · +91 98765 43210</p>
          </div>
        </div>

        <div className="user-addresses-list">
          <h3>Saved Addresses</h3>
          {addresses.map((a) => (
            <div key={a.id} className="saved-addr-row">
              <strong>{a.label}</strong>
              <p>{a.text}</p>
            </div>
          ))}
        </div>

        <div className="account-links-row">
          <Link href="/orders" className="account-nav-tile">
            <span>📦</span>
            <div>
              <strong>Order History</strong>
              <small>View past invoices</small>
            </div>
          </Link>
          <Link href="/favorites" className="account-nav-tile">
            <span>❤️</span>
            <div>
              <strong>Saved Items</strong>
              <small>Your favorite produce</small>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

