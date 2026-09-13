"use client";
import Link from "next/link";
import { useState } from "react";
import { money, Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Icon } from "./icons";
import { QuantityStepper } from "./site-shell";

export function ProductCard({product,featured=false}:{product:Product;featured?:boolean}){
 const {cart,favorites,toggleFavorite,add,setCartOpen,notify}=useStore(); const [phase,setPhase]=useState<'idle'|'adding'|'added'>('idle'); const qty=cart[product.id]?.quantity??0;
 const handleAdd=(e:React.MouseEvent<HTMLButtonElement>)=>{if(qty){setCartOpen(true);return} setPhase('adding'); flyToCart(e.currentTarget,product.image); add(product.id); notify(`${product.name} added to your basket`); setTimeout(()=>setPhase('added'),500);};
 return <article className={`product-card ${featured?'featured':''}`}><div className="product-photo" style={{background:product.color}}><Link href={`/product/${product.id}`}><img src={product.image} alt={product.name}/></Link><span className="fresh-badge">{product.badge}</span>{product.offer&&<span className="offer-badge">{product.offer}</span>}<button className={`heart ${favorites.has(product.id)?'saved':''}`} onClick={()=>toggleFavorite(product.id)} aria-label={`${favorites.has(product.id)?'Remove from':'Add to'} favorites`}><Icon name="heart"/></button></div><div className="product-info"><Link href={`/product/${product.id}`}><span className="farm-tag">{product.farm} · {product.distance}</span><h3>{product.name}</h3></Link><div className="product-bottom"><div><strong>{money(product.price)}</strong>{product.originalPrice&&<del>{money(product.originalPrice)}</del>}<span> / {product.unit}</span></div>{qty&&phase==='added'?<QuantityStepper id={product.id} quantity={qty}/>:<button className={`add-btn ${phase}`} onClick={handleAdd}>{phase==='adding'?<><Icon name="check"/> Added</>:phase==='added'?<>Basket <Icon name="arrow"/></>:<><Icon name="basket"/> Add</>}</button>}</div></div></article>
}

function flyToCart(source:HTMLElement,image:string){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return; const target=document.querySelector('#cart-target'); if(!target)return; const a=source.getBoundingClientRect(),b=target.getBoundingClientRect(); const ghost=document.createElement('img'); ghost.src=image; ghost.className='fly-ghost'; ghost.style.left=`${a.left+a.width/2-30}px`;ghost.style.top=`${a.top-20}px`;document.body.appendChild(ghost); const dx=b.left-a.left,dy=b.top-a.top; ghost.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx*.55}px,${dy*.35-90}px) scale(.7)`,offset:.48,opacity:.9},{transform:`translate(${dx}px,${dy}px) scale(.18)`,opacity:.2}],{duration:750,easing:'cubic-bezier(.22,1,.36,1)'}).onfinish=()=>{ghost.remove();target.animate([{transform:'scale(1)'},{transform:'scale(1.3)'},{transform:'scale(1)'}],{duration:350,easing:'cubic-bezier(.34,1.56,.64,1)'})};}
