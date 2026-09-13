import { ShopView } from "@/components/views";
export default async function Page({params}:PageProps<'/shop/[category]'>){const {category}=await params;return <ShopView category={category}/>}
