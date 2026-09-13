import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "Root & Leaf — The neighbourhood harvest", template: "%s · Root & Leaf" },
  description: "Seasonal vegetables from nearby farms, delivered fresh to your door.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
