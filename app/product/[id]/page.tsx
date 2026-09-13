import { ProductView } from "@/components/views";
export default async function Page({params}:PageProps<'/product/[id]'>){const {id}=await params;return <ProductView id={id}/>}
