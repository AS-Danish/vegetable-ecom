"use client";
import Link from "next/link";
import { money, Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Icon } from "./icons";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { cart, favorites, toggleFavorite, add, setQty, notify } = useStore();
  const qty = cart[product.id]?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    flyToCart(e.currentTarget, product.image);
    add(product.id);
    notify(`${product.name} added to cart`);
  };

  const handleDec = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(product.id, qty - 1);
  };

  const handleInc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(product.id, qty + 1);
  };

  return (
    <article className={`product-card ${featured ? "featured" : ""}`}>
      <div className="product-photo-wrap">
        <Link href={`/product/${product.id}`} className="product-photo-link" aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.offer && <span className="product-discount-badge">{product.offer}</span>}
        <span className="product-fresh-tag">{product.badge}</span>
        <button
          type="button"
          className={`heart-btn ${favorites.has(product.id) ? "saved" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={favorites.has(product.id) ? "Remove from saved" : "Save item"}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>

      <div className="product-info-wrap">
        <div className="product-source-row">
          <span className="farm-name">{product.farm}</span>
          <span className="farm-dist">· {product.distance}</span>
        </div>

        <Link href={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <p className="product-unit-text">{product.unit}</p>

        <div className="product-action-row">
          <div className="price-box">
            <span className="current-price">{money(product.price)}</span>
            {product.originalPrice && <del className="strike-price">{money(product.originalPrice)}</del>}
          </div>

          <div className="add-control-box">
            {qty === 0 ? (
              <button
                type="button"
                className="add-to-cart-btn"
                onClick={handleAdd}
                aria-label={`Add ${product.name} to cart`}
              >
                <Icon name="plus" size={16} />
                <span>ADD</span>
              </button>
            ) : (
              <div className="card-stepper" role="group" aria-label="Quantity selector">
                <button
                  type="button"
                  className="stepper-btn dec-btn"
                  onClick={handleDec}
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" size={14} />
                </button>
                <span className="stepper-val">{qty}</span>
                <button
                  type="button"
                  className="stepper-btn inc-btn"
                  onClick={handleInc}
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function flyToCart(source: HTMLElement, image: string) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = document.querySelector("#cart-target");
  if (!target) return;
  const a = source.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const ghost = document.createElement("img");
  ghost.src = image;
  ghost.className = "fly-ghost";
  ghost.style.left = `${a.left + a.width / 2 - 25}px`;
  ghost.style.top = `${a.top}px`;
  document.body.appendChild(ghost);
  const dx = b.left - a.left;
  const dy = b.top - a.top;
  ghost
    .animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.35 - 70}px) scale(0.7)`, offset: 0.5, opacity: 0.9 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3 },
      ],
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    )
    .onfinish = () => {
      ghost.remove();
      target.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
        { duration: 300, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    };
}

