"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { money, products } from "@/lib/data";
import { StoreProvider, useCartTotals, useStore } from "@/lib/store";
import { Icon } from "./icons";

export function SiteShell({children}:{children:React.ReactNode}){
  return <StoreProvider><ShellChrome>{children}</ShellChrome></StoreProvider>;
}

function ShellChrome({children}:{children:React.ReactNode}){
  const {cartOpen,setCartOpen,searchOpen,setSearchOpen,toasts,activeOrder}=useStore();
  const {count}=useCartTotals(); const pathname=usePathname();
  useEffect(()=>{setCartOpen(false);setSearchOpen(false)},[pathname,setCartOpen,setSearchOpen]);
  return <>
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Root and Leaf home"><span className="brand-mark">R<span>·</span>L</span><span>Root <i>&</i> Leaf</span></Link>
        <div className="nav-links"><Link href="/shop">Shop</Link><Link href="/orders">My orders</Link><Link href="/favorites">Saved</Link></div>
        <div className="nav-actions">
          <button className="nav-search" onClick={()=>setSearchOpen(true)}><Icon name="search"/><span>Search vegetables</span><kbd>⌘ K</kbd></button>
          <Link href="/favorites" className="icon-btn" aria-label="Favorites"><Icon name="heart"/></Link>
          <button id="cart-target" className={`icon-btn cart-trigger ${count?"has-items":""}`} aria-label={`Cart, ${count} items`} onClick={()=>setCartOpen(true)}><Icon name="basket"/><span key={count} className="cart-count">{count}</span></button>
        </div>
      </nav>
    </header>
    <main className="page-enter">{children}</main>
    {activeOrder && activeOrder.stage < 3 && <Link href={`/orders/${activeOrder.id}/track`} className="track-pill"><span className="pulse-dot"/> Track your order <Icon name="arrow" size={17}/></Link>}
    <MobileNav count={count} onSearch={()=>setSearchOpen(true)} onCart={()=>setCartOpen(true)}/>
    {cartOpen && <CartDrawer onClose={()=>setCartOpen(false)}/>} {searchOpen && <SearchOverlay onClose={()=>setSearchOpen(false)}/>} 
    <div className="toast-stack" aria-live="polite">{toasts.map(t=><div className="toast" key={t.id}><Icon name="check" size={17}/>{t.message}<span/></div>)}</div>
  </>;
}

function MobileNav({count,onSearch,onCart}:{count:number;onSearch:()=>void;onCart:()=>void}){
  const path=usePathname(); const items=[['/','home','Home'],['/shop','shop','Shop']];
  return <nav className="mobile-nav">{items.map(([href,icon,label])=><Link href={href} className={path===href?'active':''} key={href}><Icon name={icon}/><span>{label}</span></Link>)}<button onClick={onSearch}><Icon name="search"/><span>Search</span></button><button onClick={onCart} className="mobile-cart"><Icon name="basket"/>{count>0&&<b>{count}</b>}<span>Cart</span></button><Link href="/account" className={path==='/account'?'active':''}><Icon name="user"/><span>Account</span></Link></nav>;
}

function CartDrawer({onClose}:{onClose:()=>void}){
  const {cart,setQty}=useStore(); const {subtotal}=useCartTotals(); const router=useRouter();
  const lines=Object.entries(cart).map(([id,line])=>({product:products.find(p=>p.id===id)!,...line})).filter(x=>x.product);
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Your cart"><button className="drawer-backdrop" onClick={onClose} aria-label="Close cart"/><aside className="cart-drawer"><div className="drawer-head"><div><span className="eyebrow">Your cart</span><h2>{lines.length?`${lines.length} items`:"Your cart"}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close cart"><Icon name="close"/></button></div>
  {!lines.length?<div className="empty-basket"><div className="basket-illo">⌒<span>♧</span></div><h3>Your cart is empty</h3><p>Browse fresh vegetables and add your favourites.</p><button className="primary" onClick={()=>{onClose();router.push('/shop')}}>Start shopping</button></div>:<><div className="cart-lines">{lines.map(({product,quantity})=><div className="cart-line" key={product.id}><img src={product.image} alt=""/><div><h3>{product.name}</h3><p>{money(product.price)} · {product.unit}</p><QuantityStepper id={product.id} quantity={quantity}/></div><button className="remove" onClick={()=>setQty(product.id,0)} aria-label={`Remove ${product.name}`}><Icon name="close" size={17}/></button></div>)}</div><div className="drawer-total"><div><span>Subtotal</span><strong key={subtotal}>{money(subtotal)}</strong></div><p>Free delivery on orders above ₹499</p><button className="primary wide" onClick={()=>{onClose();router.push('/checkout')}}>Proceed to checkout <Icon name="arrow"/></button><Link href="/cart" onClick={onClose}>View cart</Link></div></>}
  </aside></div>;
}

export function QuantityStepper({id,quantity}:{id:string;quantity:number}){const {setQty}=useStore();return <div className="stepper"><button onClick={()=>setQty(id,quantity-1)} aria-label="Decrease quantity"><Icon name="minus" size={16}/></button><span key={quantity}>{quantity}</span><button onClick={()=>setQty(id,quantity+1)} aria-label="Increase quantity"><Icon name="plus" size={16}/></button></div>}

function SearchOverlay({onClose}:{onClose:()=>void}){
  const [query,setQuery]=useState(""); const input=useRef<HTMLInputElement>(null); const router=useRouter();
  useEffect(()=>input.current?.focus(),[]); const matches=products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())||p.category.toLowerCase().includes(query.toLowerCase())).slice(0,6);
  const go=(id:string)=>{onClose();router.push(`/product/${id}`)};
  return <div className="search-layer" role="dialog" aria-modal="true" aria-label="Search"><button className="search-dismiss" onClick={onClose} aria-label="Close search"/><section className="search-panel"><div className="search-input"><Icon name="search" size={25}/><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="What are you cooking?" aria-label="Search products"/><button onClick={onClose}><Icon name="close"/></button></div>{query?<div className="search-results"><span className="eyebrow">Search results</span>{matches.length?matches.map(p=><button key={p.id} onClick={()=>go(p.id)}><img src={p.image} alt=""/><span><strong>{p.name}</strong><small>{p.farm} · {money(p.price)}</small></span><Icon name="arrow"/></button>):<div className="no-results">No matching products. Try another vegetable or category.</div>}</div>:<div className="search-idle"><div><span className="eyebrow">Trending this week</span><div className="trend-chips">{["Heirloom tomatoes","Salad greens","Basil","Rainbow carrots"].map(x=><button onClick={()=>setQuery(x)} key={x}>{x}</button>)}</div></div><div><span className="eyebrow">Recently searched</span><p>broccoli <span>·</span> coriander <span>·</span> salad box</p></div></div>}</section></div>;
}

export function Footer(){return <footer className="footer"><div className="shell footer-grid"><div><Link href="/" className="brand light"><span className="brand-mark">R<span>·</span>L</span><span>Root <i>&</i> Leaf</span></Link><p>Good food begins in good soil.</p></div><div><span>Shop</span><Link href="/shop">All vegetables</Link><Link href="/shop/seasonal">In season</Link><Link href="/favorites">Favorites</Link></div><div><span>Customer support</span><Link href="/orders">My orders</Link><Link href="/account">Account & addresses</Link><a href="mailto:hello@rootandleaf.test">hello@rootandleaf.test</a></div><div className="newsletter"><span>Fresh offers by email</span><div><input placeholder="Email address" aria-label="Email address"/><button aria-label="Subscribe"><Icon name="arrow"/></button></div></div></div><div className="shell footer-bottom"><span>© 2026 Root & Leaf</span><span>Demo vegetable store</span></div></footer>}
