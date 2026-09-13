export type Product = {
  id: string; name: string; category: string; price: number; unit: string;
  image: string; farm: string; distance: string; badge: string; tags: string[];
  description: string; rating: number; color: string;
  originalPrice?: number; offer?: string; nutrition?: string[]; storage?: string;
};

const images = {
  tomato: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85",
  greens: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=85",
  carrot: "https://images.unsplash.com/photo-1447175008436-1701707538bb?auto=format&fit=crop&w=900&q=85",
  herbs: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85",
  broccoli: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=85",
  pumpkin: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=85",
  peppers: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=85",
  market: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85",
};

const base: Omit<Product, "id" | "name" | "category" | "price" | "unit" | "image" | "farm" | "distance" | "badge" | "tags" | "description" | "rating" | "color"> = {};

const productRows = [
  ["heirloom-tomatoes","Heirloom tomatoes","Seasonal",180,"500g",images.tomato,"Kaveri Acres","8 km","picked at dawn",["seasonal"],"Juicy, sun-warmed tomatoes with a bright, old-fashioned sweetness.",4.9,"#f0b29d"],
  ["baby-spinach","Baby spinach","Leafy greens",68,"200g",images.greens,"Patel Farms","12 km","harvested today",["organic"],"Tender young leaves, triple washed and ready for salads.",4.8,"#b9cfad"],
  ["rainbow-carrots","Rainbow carrots","Roots",95,"500g",images.carrot,"Mitti Collective","18 km","soil to shelf",["organic","seasonal"],"Sweet, crisp roots with their feathery tops still on.",4.9,"#e7bd72"],
  ["sweet-basil","Sweet basil","Herbs",45,"bunch",images.herbs,"Urban Leaf Co.","5 km","cut this morning",["organic"],"Aromatic, soft-leaf basil for pesto, pasta and salads.",4.7,"#9fc48d"],
  ["tender-broccoli","Tenderstem broccoli","Exotic",145,"300g",images.broccoli,"Nilgiri Gardens","24 km","crisp & young",["exotic"],"Sweet stems and delicate florets that need barely any cooking.",4.8,"#9eb791"],
  ["red-pumpkin","Red pumpkin","Roots",78,"1 kg",images.pumpkin,"Sundar Fields","15 km","vine ripened",["seasonal"],"Dense golden flesh for silky curries, roasts and soups.",4.6,"#e5a467"],
  ["sweet-peppers","Sweet peppers","Exotic",165,"400g",images.peppers,"Glasshouse 22","21 km","colour picked",["exotic"],"A bright trio of crunchy, naturally sweet peppers.",4.8,"#e3a857"],
  ["garden-cucumber","Garden cucumber","Seasonal",52,"500g",images.market,"Kaveri Acres","8 km","extra crisp",["seasonal"],"Cool, clean and snappy — perfect for quick summer salads.",4.5,"#bad4a3"],
  ["coriander","Coriander","Herbs",24,"bunch",images.herbs,"Urban Leaf Co.","5 km","cut this morning",["organic"],"Fragrant leaves and tender stems, bundled without plastic.",4.8,"#a8c694"],
  ["beetroot","Earthy beetroot","Roots",72,"500g",images.carrot,"Mitti Collective","18 km","soil to shelf",["organic"],"Deep ruby roots with a clean, earthy sweetness.",4.7,"#c68183"],
  ["romaine","Romaine hearts","Leafy greens",88,"2 heads",images.greens,"Patel Farms","12 km","harvested today",["organic"],"Crunchy centres made for generous Caesar salads.",4.8,"#b5ca91"],
  ["cherry-tomatoes","Cherry tomatoes","Seasonal",105,"250g",images.tomato,"Kaveri Acres","8 km","picked at dawn",["seasonal"],"Little bursts of honeyed acidity, lovely straight from the punnet.",4.9,"#e89a78"],
  ["green-chilli","Green chilli","Herbs",28,"100g",images.peppers,"Sundar Fields","15 km","bright heat",["seasonal"],"Clean, lively heat with a grassy finish.",4.6,"#94b378"],
  ["zucchini","Tender zucchini","Exotic",120,"500g",images.market,"Glasshouse 22","21 km","small batch",["exotic"],"Young and silky with a delicate flavour.",4.7,"#aabb7f"],
  ["spring-onion","Spring onion","Herbs",42,"bunch",images.herbs,"Urban Leaf Co.","5 km","cut this morning",["organic"],"Peppery green tops with crisp, sweet bulbs.",4.7,"#a6bf8d"],
  ["cauliflower","Cloud cauliflower","Seasonal",84,"1 head",images.broccoli,"Patel Farms","12 km","field fresh",["seasonal"],"Tight, creamy florets with a pleasantly nutty bite.",4.6,"#ded9c2"],
];

const extras: Record<string, Partial<Product>> = {
  "heirloom-tomatoes": { originalPrice: 225, offer: "20% off", nutrition: ["Vitamin C", "Lycopene", "Potassium"], storage: "Keep at room temperature and away from direct sun." },
  "baby-spinach": { originalPrice: 85, offer: "20% off", nutrition: ["Iron", "Folate", "Vitamin K"], storage: "Refrigerate in its paper wrap and use within 3 days." },
  "rainbow-carrots": { originalPrice: 120, offer: "15% off", nutrition: ["Beta-carotene", "Fibre", "Vitamin A"], storage: "Remove leafy tops and refrigerate in a loose paper bag." },
  "sweet-peppers": { originalPrice: 195, offer: "Save ₹30", nutrition: ["Vitamin C", "Vitamin B6", "Antioxidants"] },
  "romaine": { originalPrice: 105, offer: "Today only" },
  "cherry-tomatoes": { originalPrice: 125, offer: "Farm special" },
};

export const products: Product[] = productRows.map((p) => {
  const [id,name,category,price,unit,image,farm,distance,badge,tags,description,rating,color] = p as [string,string,string,number,string,string,string,string,string,string[],string,number,string];
  return {...base,id,name,category,price,unit,image,farm,distance,badge,tags,description,rating,color,...extras[id]};
});

export const promoCodes = [
  { code: "FIRSTLEAF", label: "15% off your first basket", min: 399, percent: 15 },
  { code: "FARMDAY", label: "₹75 off above ₹699", min: 699, flat: 75 },
];

export const categories = [
  { name: "Leafy greens", slug: "leafy-greens", glyph: "⌇", blurb: "Soft leaves & crisp hearts" },
  { name: "Roots", slug: "roots", glyph: "♢", blurb: "Pulled from rich soil" },
  { name: "Herbs", slug: "herbs", glyph: "⌁", blurb: "Cut fragrant & fresh" },
  { name: "Exotic", slug: "exotic", glyph: "✣", blurb: "A little less ordinary" },
  { name: "Organic only", slug: "organic", glyph: "◌", blurb: "Grown gently" },
  { name: "Seasonal", slug: "seasonal", glyph: "☼", blurb: "At its best right now" },
];

export const addresses = [
  { id: "home", label: "Home", text: "14, Banyan Lane, Indiranagar, Bengaluru 560038" },
  { id: "studio", label: "Studio", text: "62, Museum Road, Ashok Nagar, Bengaluru 560001" },
];

export const pastOrders = [
  { id: "RL-4821", date: "06 Sep", total: 524, items: ["baby-spinach","rainbow-carrots","sweet-basil"] },
  { id: "RL-4618", date: "27 Aug", total: 386, items: ["heirloom-tomatoes","garden-cucumber","coriander"] },
];

export const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
