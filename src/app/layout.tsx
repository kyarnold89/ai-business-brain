import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Agent Augusta Business Brain",
  description:
    "See your business running on AI — in about 15 seconds. A live snapshot from Agent Augusta, the CSRA's AI business partner.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
