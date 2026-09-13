"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products } from "./data";

type CartLine = { quantity: number; addedAt: number };
type Toast = { id: number; message: string };
type Store = {
  cart: Record<string, CartLine>; favorites: Set<string>; cartOpen: boolean; searchOpen: boolean;
  toasts: Toast[]; activeOrder: { id: string; stage: number; address: string; slot: string; payment: string; placedAt: number } | null;
  add: (id:string)=>void; setQty:(id:string,qty:number)=>void; toggleFavorite:(id:string)=>void;
  setCartOpen:(v:boolean)=>void; setSearchOpen:(v:boolean)=>void; notify:(m:string)=>void;
  placeOrder:(details:{address:string;slot:string;payment:string})=>Promise<string>; advanceOrder:()=>void; clearCart:()=>void;
};
const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["rainbow-carrots"]));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeOrder, setActiveOrder] = useState<{id:string;stage:number;address:string;slot:string;payment:string;placedAt:number}|null>(null);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("root-leaf-state");
      if (saved) { const parsed = JSON.parse(saved); setCart(parsed.cart ?? {}); setFavorites(new Set(parsed.favorites ?? [])); setActiveOrder(parsed.activeOrder ?? null); }
    } catch {}
  }, []);
  useEffect(() => { try { sessionStorage.setItem("root-leaf-state", JSON.stringify({cart,favorites:[...favorites],activeOrder})); } catch {} }, [cart,favorites,activeOrder]);
  const notify = useCallback((message:string) => {
    const id = Date.now(); setToasts(t => [...t,{id,message}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  },[]);
  const add = useCallback((id:string) => setCart(c => ({...c,[id]:{quantity:(c[id]?.quantity ?? 0)+1,addedAt:Date.now()}})),[]);
  const setQty = useCallback((id:string, quantity:number) => setCart(c => { const next={...c}; if(quantity<=0) delete next[id]; else next[id]={...next[id],quantity}; return next; }),[]);
  const toggleFavorite = useCallback((id:string) => setFavorites(f => { const n=new Set(f); n.has(id)?n.delete(id):n.add(id); return n; }),[]);
  const placeOrder = useCallback(async(details:{address:string;slot:string;payment:string})=>{ await new Promise(r=>setTimeout(r,1100)); const id=`RL-${Math.floor(1000+Math.random()*8999)}`; setActiveOrder({id,stage:0,...details,placedAt:Date.now()}); setCart({}); return id; },[]);
  const advanceOrder=useCallback(()=>setActiveOrder(o=>o?{...o,stage:Math.min(3,o.stage+1)}:o),[]);
  useEffect(()=>{
    type WebTool={name:string;title:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean;untrustedContentHint:boolean};execute:(input:unknown)=>unknown};
    const context=(document as Document & {modelContext?:{registerTool:(tool:WebTool,options?:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if(!context?.registerTool)return;
    const lifecycle=new AbortController();
    const register=(tool:WebTool)=>{try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}};
    register({
      name:"add_products_to_basket",title:"Add produce to basket",
      description:"Add one or more Root & Leaf product IDs to the visible shopping basket.",
      inputSchema:{type:"object",properties:{items:{type:"array",items:{type:"object",properties:{productId:{type:"string"},quantity:{type:"integer",minimum:1,maximum:20}},required:["productId","quantity"],additionalProperties:false},minItems:1,maxItems:20}},required:["items"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute:(input)=>{
        const items=(input as {items?:Array<{productId?:string;quantity?:number}>}).items;
        if(!Array.isArray(items)||!items.length)throw new Error("items must be a non-empty array");
        for(const item of items){if(!item.productId||!products.some(p=>p.id===item.productId)||!Number.isInteger(item.quantity)||typeof item.quantity!=="number"||item.quantity<1)throw new Error("Each item needs a valid productId and positive integer quantity")}
        setCart(current=>{const next={...current};for(const item of items){next[item.productId!]={quantity:(next[item.productId!]?.quantity??0)+item.quantity!,addedAt:Date.now()}}return next});
        return{status:"added",itemCount:items.reduce((sum,item)=>sum+item.quantity!,0)};
      }
    });
    register({
      name:"read_basket",title:"Read basket",
      description:"Read the current Root & Leaf basket items and subtotal without changing them.",
      inputSchema:{type:"object",properties:{},additionalProperties:false},
      annotations:{readOnlyHint:true,untrustedContentHint:false},
      execute:()=>{const items=Object.entries(cart).map(([productId,line])=>({productId,name:products.find(p=>p.id===productId)?.name,quantity:line.quantity}));return{items,itemCount:items.reduce((sum,item)=>sum+item.quantity,0)}}
    });
    return()=>lifecycle.abort();
  },[cart]);
  const value=useMemo(()=>({cart,favorites,cartOpen,searchOpen,toasts,activeOrder,add,setQty,toggleFavorite,setCartOpen,setSearchOpen,notify,placeOrder,advanceOrder,clearCart:()=>setCart({})}),[cart,favorites,cartOpen,searchOpen,toasts,activeOrder,add,setQty,toggleFavorite,notify,placeOrder,advanceOrder]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore(){ const ctx=useContext(StoreContext); if(!ctx) throw new Error("useStore must be inside StoreProvider"); return ctx; }
export function useCartTotals(){ const {cart}=useStore(); return useMemo(()=>{let count=0,subtotal=0; for(const [id,line] of Object.entries(cart)){const p=products.find(x=>x.id===id); if(p){count+=line.quantity; subtotal+=p.price*line.quantity;}} return {count,subtotal};},[cart]); }
