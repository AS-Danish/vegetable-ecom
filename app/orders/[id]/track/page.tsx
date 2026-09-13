import { TrackingView } from "@/components/views";
export default async function Page({params}:PageProps<'/orders/[id]/track'>){const {id}=await params;return <TrackingView id={id}/>}
