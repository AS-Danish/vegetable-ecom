import { ConfirmationView } from "@/components/views";
export default async function Page({params}:PageProps<'/order-confirmed/[id]'>){const {id}=await params;return <ConfirmationView id={id}/>}
